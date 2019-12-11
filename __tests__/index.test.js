import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('genDiff', () => {
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__/result1'), 'utf-8');
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toEqual(result);
  expect(genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml')).toEqual(result);
});
