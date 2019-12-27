import fs from 'fs';
import genDiff from '../src';

const filetypes = ['ini', 'json', 'yml'];
const formats = ['complex', 'plain', 'json'];

const testArgs = formats.map((format) => (
  filetypes.map((filetype) => [filetype, format])
)).flat();

test.each(testArgs)('%s type files difference with %s output', (filetype, format) => {
  const getPath = (filename) => `__tests__/__fixtures__/${filename}`;
  const before = getPath(`before.${filetype}`);
  const after = getPath(`after.${filetype}`);
  const output = fs.readFileSync(getPath(format), 'utf-8');
  expect(genDiff(before, after, format)).toEqual(output);
});
