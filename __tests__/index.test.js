import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const result = fs.readFileSync(path.join(__dirname, '__fixtures__/result1'), 'utf-8');
const mainPath = '__tests__/__fixtures__/';
const makePath = (curPath, file) => path.join(path.join(mainPath, curPath), file);
const jsons = 'simpleJson/';
const yamls = 'simpleYaml/';
const inis = 'simpleIni/';
const testFiles = [
  [makePath(jsons, 'before.json'), makePath(jsons, 'after.json')],
  [makePath(yamls, 'before.yml'), makePath(yamls, 'after.yml')],
  [makePath(inis, 'before.ini'), makePath(inis, 'after.ini')],
];

test.each(testFiles)('differences', (before, after) => {
  expect(genDiff(before, after)).toEqual(result);
});
