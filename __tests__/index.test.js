import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const result = fs.readFileSync(path.join(__dirname, '__fixtures__/result'), 'utf-8');
const pathToFiles = '__tests__/__fixtures__/filesToTest/';

const extNames = ['.json', '.yml', '.ini'];

const makePath = (curPath, file) => path.join(curPath, file);

const testFiles = extNames.map((extName) => (
  [makePath(pathToFiles, `before${extName}`), makePath(pathToFiles, `after${extName}`)]
));
test.each(testFiles)('differences between files', (before, after) => {
  expect(genDiff(before, after)).toEqual(result);
});
