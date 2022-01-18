// TODO: Remove this CLI args parsing from server entrypoint, by using
// a dedicated binary script to manage on-the-fly VS setup.
// const argv = yargsParser(process.argv.slice(2))
const yargsParser = require('yargs-parser')
const argv = yargsParser(process.argv.slice(2))
const assetsPrefix = argv.assetsPrefix || null

module.exports = {
  user: {
    assetsPrefix,
  }
}
