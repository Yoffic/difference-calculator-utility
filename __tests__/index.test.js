import fs from 'fs';
import genDiff from '../src';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getPath = (filename) => `__tests__/__fixtures__/${filename}`;

const filetypes = ['ini', 'json', 'yml'];

const getArgs = (format) => filetypes.map((filetype) => (
  [getPath(`before.${filetype}`), getPath(`after.${filetype}`), format]
));

describe('generate difference', () => {
  const testArgs1 = getArgs('complex');
  test.each(testArgs1)('complex output %p, %p', (before, after, format) => {
    const output = readFile(getPath(format));
    expect(genDiff(before, after, format)).toEqual(output);
  });

  const testArgs2 = getArgs('plain');
  test.each(testArgs2)('plain output %p, %p', (before, after, format) => {
    const output = readFile(getPath(format));
    expect(genDiff(before, after, format)).toEqual(output);
  });

  const testArgs3 = getArgs('json');
  test.each(testArgs3)('json output %p, %p', (before, after, format) => {
    const output = readFile(getPath(format));
    expect(genDiff(before, after, format)).toEqual(output);
  });
});
