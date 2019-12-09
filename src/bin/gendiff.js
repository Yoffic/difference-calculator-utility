#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.0.1', '-V, --version', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)));

program.parse(process.argv);
