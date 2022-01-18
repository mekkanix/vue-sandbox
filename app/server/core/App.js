const express = require('express')
const ejs = require('ejs')
const apiRouter = require('../router.js')

module.exports = class App {
  conf = null

  constructor (conf) {
    this.conf = conf
  }

  start () {
    if (this.conf) {
      const app = express()
      app.engine('html', ejs.renderFile)
      app.set('view engine', 'html')
      app.set('views', process.cwd() + '/app/ui')
      app.use(
        '/assets/',
        express.static(process.cwd() + '/app/ui/assets/dist/')
      )
      app.listen(this.conf.port, () => {
        console.log(`\r\n[VueSandbox] Program started.`)
        console.log(`[VueSandbox] Host: http://localhost:${this.conf.port}`)
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
}
