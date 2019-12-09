import genDiff from '../src';

test('genDiff', () => {
  const result = `{
   host: hexlet.io
 + timeout: 20
 - timeout: 50
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`;
  expect(genDiff('src/files/before.json', 'src/files/after.json')).toEqual(result);
});
