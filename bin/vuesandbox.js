#!/usr/bin/env node

require('module-alias/register')
const pkg = require('@root/package.json')
const cp = require('child_process')
const { Command, } = require('commander')
const { runCmd, } = require('@root/utils/ScriptManager.js')

// Config, Bootstrapping
const program = new Command()
const VS_ENV = process.env.VS_ENV
const rootDir = process.cwd()
console.log(`\r\n[VueSandbox - v${pkg.version}]`)
console.log(`> Mode: ${VS_ENV}`)

/**
 * Helpers
 */

function formatArgValue(value, type) {
  switch (type) {
    case 'path':
      const lastValueChar = value.substring(value.length - 1, value.length)
      return lastValueChar === '/' ? value.substring(0, value.length - 1) : value
  }
}

function formatArgsToCmd(options) {
  return Object.entries(options)
    .map((opt) => {
      if (opt[0] && opt[1]) {
        return `--${opt[0]}=${JSON.stringify(opt[1])}`
      }
      return null
    })
    .filter(opt => !!opt)
    .join(' ')
}

function formatArgsToWebpackCmd(options) {
  return Object.entries(options)
    .map((opt) => {
      if (opt[0] && opt[1]) {
        return `${opt[0]}=${JSON.stringify(opt[1])}`
      }
      return null
    })
    .filter(opt => !!opt)
    .join(' ')
}

/**
 * Command: start
 */

program
  .command('start')
  .option('-p, --assetsprefix [prefix]', '<assetsprefix test>', '')
  .description('Starts the VueSandbox server daemon.')
  .action((args) => {
    const optAssetsPrefix = formatArgValue(args.assetsprefix, 'path') || null
    const opts = {
      assetsprefix: optAssetsPrefix,
    }
    const fmtArgs = formatArgsToWebpackCmd(opts)
    const cmdArgs = fmtArgs ? `--env ${fmtArgs}` : ''
    const cmdDevBuild = `${rootDir}/node_modules/.bin/webpack-cli build --config ${rootDir}/config/app/webpack.dev.js --watch ${cmdArgs}`
    console.log(`> Command: ${cmdDevBuild}`)

    console.log(`\r\n[VueSandbox] Starting server...`)
    const process = cp.exec(cmdDevBuild, {}, (error, stdout, stderr) => {
      if (error) {
        console.error(`\r\n[VueSandbox] Child process exec. error:`)
        console.error(error)
        return
      }
      console.log(`\r\n[VueSandbox] Child process log:`)
      console.log(stdout)
      console.error(`\r\n[VueSandbox] Child process error:`)
      console.error(stderr)
    })
    process.stdout.on('data', (data) => {
      console.error(`\r\n${data}`)
    })
    process.on('exit', (code) => {
      console.error(`\r\n[VueSandbox:${process.pid}] Child process exited with code: ${code}`)
    })
    process.on('close', (code) => {
      console.error(`\r\n[VueSandbox] Command terminated with code: ${code}`)
    })

    // if (VS_ENV === 'production') {
    //   runCmd(`node ${rootDir}/app/server/main.js`, opts, (data) => {
    //     console.error(data)
    //   })
    // } else if (VS_ENV === 'development') {
    //   const cmdBuild = `${rootDir}/node_modules/.bin/webpack-cli build --config ${rootDir}/config/app/webpack.dev.js --watch`
    //   // const cmdServer = `nodemon ${rootDir}/app/server/main.js`
    //   runCmd(cmdBuild, {}, (data) => {
    //     console.error(data)
    //   })
    //   // runCmd(cmdServer, opts, (data) => {
    //   //   console.error(data)
    //   // })
    // }
  })

program.parse()
