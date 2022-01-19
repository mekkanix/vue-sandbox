const express = require('express')
const ejs = require('ejs')
const AssetsBuilder = require('./AssetsBuilder')
const apiRouter = require('../router')

module.exports = class App {
  conf = null

  constructor (conf) {
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
    app.listen(this.conf.port, () => {
      console.log(`[VueSandbox] Server: OK`)
    })

    app.use('/api', apiRouter)

    // Wildcard route for index template file (GET)
    app.get('/*', (req, res) => {
      res.render('index', {
        assets: this.conf.static,
      })
    })
  }
}
