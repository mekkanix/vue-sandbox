const cp = require('child_process')

class ScriptManager {

  static runCmd(cmd, options, callback = null) {
    let argv = Object.entries(options)
      .map((opt) => {
        if (opt[0] && opt[1]) {
          return `--${opt[0]}=${JSON.stringify(opt[1])}`
        }
        return null
      })
      .filter(opt => !!opt)

    const process = cp.exec(`${cmd} ${argv.join(' ')}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }
      if (stderr) {
        console.log(stderr)
        return
      }
      console.log(stdout)
    })

    process.stdout.on('data', function (data) {
      console.log(data)
    })

    process.on('error', function (err) {
      console.error(`\r\n[VueSandbox: Command Error]`)
      console.error(`> CMD: ${cmd}`)
      console.error(err)
      callback(err)
    })

    process.on('close', function (code) {
      console.log(`Exit code: ${code}`)
      callback(code)
    })
  }

  // static runScriptFile(filePath, options, callback = null) {
  //   let argv = Object.entries(options)
  //     .map((opt) => {
  //       if (opt[0] && opt[1]) {
  //         return `--${opt[0]}=${JSON.stringify(opt[1])}`
  //       }
  //       return null
  //     })
  //     .filter(opt => !!opt)

  //   // console.log(argv);
  //   const process = cp.fork(filePath, argv)
  //   let invoked = false
  //   process.on('error', function (err) {
  //     if (invoked) return
  //     invoked = true
  //     callback(err)
  //   })

  //   // execute the callback once the process has finished running
  //   process.on('exit', function (code) {
  //     if (invoked) return
  //     invoked = true
  //     var err = code === 0 ? null : new Error('exit code ' + code)
  //     callback(err)
  //   })
  // }

}

module.exports.default = ScriptManager
module.exports.runCmd = ScriptManager.runCmd
module.exports.runScriptFile = ScriptManager.runScriptFile
