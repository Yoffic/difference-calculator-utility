import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const result = fs.readFileSync(path.join(__dirname, '__fixtures__/result1'), 'utf-8');
const mainPath = '__tests__/__fixtures__/';
const makePath = (curPath, file) => path.join(path.join(mainPath, curPath), file);
const json = 'simpleJson/';
const yaml = 'simpleYaml/';
const ini = 'simpleIni/';
const testFiles = [
  [makePath(json, 'before.json'), makePath(json, 'after.json')],
  [makePath(yaml, 'before.yml'), makePath(yaml, 'after.yml')],
  [makePath(ini, 'before.ini'), makePath(ini, 'after.ini')],
];

test.each(testFiles)('differences', (before, after) => {
  expect(genDiff(before, after)).toEqual(result);
});
