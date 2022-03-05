const yargsParser = require('yargs-parser')

module.exports = class VSProcess {
  _nodeExecPath = null
  _entryScriptFile = null
  _rawArgs = []
  _args = {}

  constructor(_process) {
    this._initProcess(_process)
  }

  _initProcess(_process) {
    let argv = _process.argv
    console.log(argv);
    this._nodeExecPath = argv[0] || null
    this._entryScriptFile = argv[1] || null
    this._rawArgs = argv.slice(2)
    this._args = yargsParser(argv.slice(2))
    delete this._args._
  }

  get rawArgs() { return this._rawArgs }

  get args() { return this._args }

}
