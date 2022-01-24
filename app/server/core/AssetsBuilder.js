const glob = require('glob')
const webpack = require('webpack')

module.exports = class AssetsBuilder {
  wpConfig = null
  wpCompiler = null
  _compsEntries = []

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
      const checkPath = 'public/components/'
      const checkPathLen = checkPath.length
      const componentsPattern = `${conf.rootDir}/public/components/**/*.vue`
      this._compsEntries = glob.sync(componentsPattern).reduce((entries, absPath) => {
        const filename = absPath.substring(absPath.indexOf('public/components/') + checkPathLen, absPath.indexOf('.vue'))
        entries.push({
          scriptName: filename.replace('/', '__'),
          relPath: `${filename}.vue`,
          absPath,
        })
        return entries
      }, [])
      this.wpConfig.entry = this._compsEntries.reduce((entries, entry) => {
        entries[entry.scriptName] = entry.absPath
        return entries
      }, {})
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
