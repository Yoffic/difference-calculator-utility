import fs from 'fs';
import path from 'path';
import { chunk } from 'lodash';
import sortFiles from '../src/utils';
import genDiff from '../src';

const resultSimple = fs.readFileSync(path.join(__dirname, '__fixtures__/resultSimple'), 'utf-8');
const resultComplex = fs.readFileSync(path.join(__dirname, '__fixtures__/resultComplex'), 'utf-8');

const pathToSimple = '__tests__/__fixtures__/simple/';
const pathToComplex = '__tests__/__fixtures__/complex/';

const makePath = (curPath, file) => path.join(curPath, file);
const getFiles = (dir) => fs.readdirSync(path.join(process.cwd(), dir), 'utf-8');

const testSimpleFiles = chunk(sortFiles(getFiles(pathToSimple))
  .map((file) => makePath(pathToSimple, file)), 2);
const testComplexFiles = chunk(sortFiles(getFiles(pathToComplex))
  .map((file) => makePath(pathToComplex, file)), 2);

test.each(testSimpleFiles)('differences between simple', (before, after) => {
  expect(genDiff(before, after)).toEqual(resultSimple);
});
test.each(testComplexFiles)('differences between complex', (before, after) => {
  expect(genDiff(before, after)).toEqual(resultComplex);
});
