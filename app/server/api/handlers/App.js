const conf = require('../../config.js')

module.exports = class App {

  static getInfos (ctx) {
    const assetsPrefix = ctx.vsProcess.args.assetsprefix || null
    return {
      assetsPrefix,
    }
  }

}
