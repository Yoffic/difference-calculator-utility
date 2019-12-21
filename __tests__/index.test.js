import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const makePath = (curDirpath, filepath) => path.join(curDirpath, filepath);
const readFile = (filepath) => fs.readFileSync(makePath(__dirname, filepath), 'utf-8');
const getFilepath = (filename) => `__fixtures__/${filename}`;

const extnames = ['.json', '.yml', '.ini'];
const pathToTestfiles = '__tests__/__fixtures__/testfiles/';
const testfilesPaths = extnames.map((extname) => (
  [makePath(pathToTestfiles, `before${extname}`), makePath(pathToTestfiles, `after${extname}`)]
));

const formats = ['complex', 'plain', 'json'];
const testArgs = formats
  .map((format) => [...testfilesPaths.map((testfilespath) => [...testfilespath, format])])
  .flat();

const resultComplex = readFile(getFilepath('expectedComplex'));
const resultPlain = readFile(getFilepath('expectedPlain'));
const resultJson = readFile(getFilepath('expectedJson'));

test.each(testArgs)('differences between files', (before, after, format) => {
  if (format === 'plain') {
    expect(genDiff(before, after, format)).toEqual(resultPlain);
  }
  if (format === 'json') {
    expect(genDiff(before, after, format)).toEqual(resultJson);
  }
  expect(genDiff(before, after)).toEqual(resultComplex);
});
