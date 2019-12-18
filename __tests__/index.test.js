import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const readFile = (fileName) => fs.readFileSync(path.join(__dirname, `__fixtures__/${fileName}`), 'utf-8');
const extNames = ['.json', '.yml', '.ini'];
const filesDir = '__tests__/__fixtures__/filesToTest/';
const makePath = (curPath, file) => path.join(curPath, file);

const filesPaths = extNames.map((extName) => (
  [makePath(filesDir, `before${extName}`), makePath(filesDir, `after${extName}`)]
));

const formats = ['complex', 'plain'];
const testArgs = formats
  .map((format) => [...filesPaths.map((file) => [...file, format])])
  .flat();

const expected = [readFile('expectedComplex'), readFile('expectedPlain')];

test.each(testArgs)('differences between files', (before, after, format) => {
  const [complex, plain] = expected;
  if (format === 'plain') {
    expect(genDiff(before, after, format)).toEqual(plain);
  }
  expect(genDiff(before, after)).toEqual(complex);
});
