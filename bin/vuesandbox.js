#!/usr/bin/env node

const subcommand = require('subcommand')
const yargsParser = require('yargs-parser')

const commands = [
  {
    name: 'start',
    options: [
      {
        name: 'assets-prefix',
        abbr: 'p',
        boolean: false,
        default: null,
        help: '',
      },
    ],
    command: (args) => {
      console.log(args);
    },
  }
]

const match = subcommand(commands, process.argv)

const matched = match(['start'])
// console.log(matched);
