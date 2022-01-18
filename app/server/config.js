const yargsParser = require('yargs-parser')
const argv = yargsParser(process.argv.slice(2))
const assetsPrefix = argv.assetsPrefix || null

module.exports = {
  user: {
    assetsPrefix,
  }
}
