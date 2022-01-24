#!/usr/bin/env node

require('module-alias/register')
const pkg = require('@root/package.json')
const { Command } = require('commander')
const { runCmd, runScriptFile } = require('@root/utils/ScriptManager.js')
const program = new Command()

const VS_ENV = process.env.VS_ENV
const rootDir = process.cwd()
console.log(`\r\n[VueSandbox - v${pkg.version}]`)
console.log(`> Mode: ${VS_ENV}\r\n`)

/**
 * Command: start
 */

program
  .command('start')
  .option('-p, --assetsprefix [prefix]', 'test command option', '')
  .description('Starts the VueSandbox server daemon.')
  .action((args) => {
    console.log(`[VueSandbox] Starting server...`)
    const optAssetsPrefix = args.assetsprefix || null
    const opts = { assetsprefix: optAssetsPrefix, }
    runCmd(`node ${rootDir}/app/server/main.js`, opts, (err) => {
      console.error(err)
    })
    // runScriptFile(`${rootDir}/app/server/main.js`, opts, (err) => {
    //   console.error(err)
    // })
  })

program.parse()
