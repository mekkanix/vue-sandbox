#!/usr/bin/env node

require('module-alias/register')
const pkg = require('@root/package.json')
const { Command } = require('commander')
const program = new Command()

const VS_ENV = process.env.VS_ENV
console.log(`\r\n[VueSandbox - v${pkg.version}]`)
console.log(`> Mode: ${VS_ENV}\r\n`)

program
  .command('start')
  .description('Starts the VueSandbox server daemon.')
  .option('-p, --assetsprefix [prefix]', 'test command option', '')
  .action((args) => {
    console.log(`[VueSandbox] Starting server...`)
    console.log(args);
  })

program.parse()
