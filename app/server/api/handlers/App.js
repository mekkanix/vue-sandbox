const conf = require('../../config.js')

module.exports = class App {

  static getMeta (_, response) {
    response.json({
      assetsPrefix: conf.user.assetsPrefix,
    })
  }

}
