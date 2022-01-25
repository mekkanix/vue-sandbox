#!/usr/bin/env node

require('module-alias/register')
const pkg = require('@root/package.json')
const { Command, } = require('commander')
const { runCmd, } = require('@root/utils/ScriptManager.js')
const program = new Command()

const VS_ENV = process.env.VS_ENV
const rootDir = process.cwd()
console.log(`\r\n[VueSandbox - v${pkg.version}]`)
console.log(`> Mode: ${VS_ENV}\r\n`)

/**
 * Args formatter
 */

function formatArgValue(value, type) {
  switch (type) {
    case 'path':
      const lastValueChar = value.substring(value.length - 1, value.length)
      return lastValueChar === '/' ? value.substring(0, value.length - 1) : value
  }
}

/**
 * Command: start
 */

program
  .command('start')
  .option('-p, --assetsprefix [prefix]', 'test command option', '')
  .description('Starts the VueSandbox server daemon.')
  .action((args) => {
    console.log(`[VueSandbox] Starting server...`)
    const optAssetsPrefix = formatArgValue(args.assetsprefix, 'path') || null
    const opts = { assetsprefix: optAssetsPrefix, }
    runCmd(`node ${rootDir}/app/server/main.js`, opts, (data) => {
      console.error(data)
    })
  })

program.parse()
