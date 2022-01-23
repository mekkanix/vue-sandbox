#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()

program
  .command('start')
  .command('description', 'test command')
  .option('-p, --assetsprefix [prefix]', 'test command option', '')
  .action((args) => {
    console.log(args);
  })

program.parse()
