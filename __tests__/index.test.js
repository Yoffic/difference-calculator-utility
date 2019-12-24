import fs from 'fs';
import genDiff from '../src';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getPath = (filename) => `__tests__/__fixtures__/${filename}`;

const filetypes = ['ini', 'json', 'yml'];
const getArgs = (format) => filetypes.map((filetype) => (
  [getPath(`before.${filetype}`), getPath(`after.${filetype}`), format]
));

const formats = ['complex', 'plain', 'json'];
const testArgs = formats.map((format) => getArgs(format)).flat();

test.each(testArgs)('compare %s, %s to have %p output format', (before, after, format) => {
  const output = readFile(getPath(format));
  expect(genDiff(before, after, format)).toEqual(output);
});
