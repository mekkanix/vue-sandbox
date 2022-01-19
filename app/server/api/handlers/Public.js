const glob = require('glob')

const ENV = process.env.VS_ENV

module.exports = class Public {

  static getComponents (_, response) {
    const componentsPattern = `${process.cwd()}/public/components/**/*.vue`
    const checkPath = 'public/components/'
    const checkPathLen = checkPath.length
    const components = glob.sync(componentsPattern).map(script => {
      const filename = script.substring(
        script.indexOf('public/components/') + checkPathLen,
        script.indexOf('.vue')
      )
      const suffix = ENV === 'development' ? '.dev' : ''
      return {
        scriptFilename: filename,
        scriptUrl: `http://localhost:9000/public/assets/${filename}${suffix}.js`
      }
    })
    response.json(components)
  }

}
