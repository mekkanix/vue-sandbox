const express = require('express')
const ejs = require('ejs')
const AssetsBuilder = require('./AssetsBuilder.js')

module.exports = class App {
  vsProcess = null
  conf = null

  constructor (vsProcess, conf) {
    this.vsProcess = vsProcess
    this.conf = conf
  }

  start() {
    if (this.conf) {
      this._initAssetsBuilder()
      this._initServer()
    }
  }

  _initAssetsBuilder() {
    const builder = new AssetsBuilder(this.conf)
  }

  _initServer() {
    const app = express()
    app.engine('html', ejs.renderFile)
    app.set('view engine', 'html')
    app.set('views', this.conf.rootDir + '/app/ui')
    app.use(
      '/assets/',
      express.static(this.conf.rootDir + '/app/ui/assets/dist/')
    )
    app.use(
      '/public/assets/',
      express.static(this.conf.rootDir + '/public/_build/')
    )

    this._initAPIRoutes(app)

    // Wildcard route for index template file (GET)
    app.get('/*', (_, res) => {
      res.render('index', {
        assets: this.conf.static,
      })
    })

    app.listen(this.conf.port, () => {
      console.log(`[VueSandbox] Server: OK`)
    })
  }

  _initAPIRoutes(app) {
    const App = require('@server/api/handlers/App.js')
    const Public = require('@server/api/handlers/Public.js')
    const router = express.Router()
    const routes = {
      '/app/infos': App.getInfos,
      '/public/components': Public.getComponents,
    }
    const ctx = {
      conf: this.conf,
      process: {
        args: this.vsProcess.args,
      },
    }
    for (const [path, fn] of Object.entries(routes)) {
      router.get(
        path,
        (_, res) => {
          const data = fn(ctx)
          return res.json(data)
        }
      )
    }
    app.use('/api', router)
  }
}
