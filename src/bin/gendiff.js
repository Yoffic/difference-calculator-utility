#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1', '-V, --version', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
