import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const resultSimple = fs.readFileSync(path.join(__dirname, '__fixtures__/resultSimple'), 'utf-8');
const resultComplex = fs.readFileSync(path.join(__dirname, '__fixtures__/resultComplex'), 'utf-8');

const pathToSimple = '__tests__/__fixtures__/simple/';
const pathToComplex = '__tests__/__fixtures__/complex/';

const extNames = ['.json', '.yml', '.ini'];

const makePath = (curPath, file) => path.join(curPath, file);

const testSimpleFiles = extNames.map((extName) => (
  [makePath(pathToSimple, `before${extName}`), makePath(pathToSimple, `after${extName}`)]
));
const testComplexFiles = extNames.map((extName) => (
  [makePath(pathToComplex, `before${extName}`), makePath(pathToComplex, `after${extName}`)]
));

test.each(testSimpleFiles)('differences between simple', (before, after) => {
  expect(genDiff(before, after)).toEqual(resultSimple);
});
test.each(testComplexFiles)('differences between complex', (before, after) => {
  expect(genDiff(before, after)).toEqual(resultComplex);
});
