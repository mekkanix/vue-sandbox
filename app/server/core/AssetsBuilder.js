const webpack = require('webpack')

module.exports = class AssetsBuilder {
  wpConfig = null

  constructor (conf) {
    this.conf = conf
    this._initWebpackConfig(conf)
    console.log(this.wpConfig);
    // this._initWebpackBuild()
  }

  _initWebpackConfig(conf) {
    const filename = conf.env === 'production' ? 'webpack.production.js' : 'webpack.dev.js'
    const config = require(`@config/public/${filename}`)
    if (config) {
      this.wpConfig = config
    }
  }

  _initWebpackBuild() {
    if (this.wpConfig) {
      webpack(this.wpConfig, (err, stats) => {
        console.log(err);
        // console.log(stats);
      })
    }
  }
}
