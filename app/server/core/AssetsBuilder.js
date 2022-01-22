const glob = require('glob')
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
      const componentsEntries = glob.sync(componentsPattern).reduce((entries, path) => {
        const filename = path.substring(path.indexOf('public/components/') + checkPathLen, path.indexOf('.vue'))
        entries[filename] = path
        return entries
      }, {})
      this.wpConfig.entry = componentsEntries
      // this.wpConfig.output.library = 
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
          return
        }

        const info = stats.toJson()
        if (stats.hasErrors()) {
          console.error('[Webpack: Compilation Error]')
          console.error(info.errors)
          return
        }
        if (stats.hasWarnings()) {
          console.error('[Webpack: Compilation Warning]')
          console.error(info.warnings)
        }
        const buildHash = stats.compilation.hash
        // console.log(Object.keys(stats.compilation));
      })
    }
  }
}
