const glob = require('glob')
const crypto = require('crypto')
const webpack = require('webpack')

module.exports = class AssetsBuilder {
  wpConfig = null
  wpCompiler = null

  constructor (conf) {
    this._initWebpackConfig(conf)
    this._initWebpackCompiler()
    this._initWebpackBuild()
  }

  _initWebpackConfig(conf) {
    const filename = conf.env === 'production' ? 'webpack.production.js' : 'webpack.dev.js'
    const config = require(`@config/public/${filename}`)
    if (config) {
      this.wpConfig = config
      // const hash = crypto.randomBytes(20).toString('hex')
      // this.wpConfig.output.library = `VSPC${hash}`
    }
  }

  _initWebpackCompiler() {
    if (this.wpConfig) {
      this.wpCompiler = webpack(this.wpConfig)
    }
  }

  _initWebpackBuild() {
    if (this.wpConfig && this.wpCompiler) {
      const watcher = this.wpCompiler.watch({}, (err, stats) => {
        if (err) {
          console.error('[Fatal Webpack Error]')
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
        }

        const info = stats.toJson()
        if (stats.hasErrors()) {
          console.error('[Webpack: Compilation Error]')
          console.error(info.errors)
        }
        if (stats.hasWarnings()) {
          console.error('[Webpack: Compilation Warning]')
          console.error(info.warnings)
        }

        console.log(Object.keys(stats.compilation));
      })
    }
  }
}
