import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getContent = (filePath) => fs.readFileSync(path.join(process.cwd(), filePath));
const getExt = (filePath) => path.extname(filePath);
const parser = {
  '.json': (content) => JSON.parse(content),
  '.yml': (content) => yaml.safeLoad(content),
};
const parse = (filePath) => parser[getExt(filePath)](getContent(filePath));
const genDiff = (filePath1, filePath2) => {
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);

  const allEntries = Object.entries(obj1).concat(Object.entries(obj2)).sort();

  const difference = allEntries.reduce((acc, [key, value]) => {
    const { [key]: startValue } = obj1;
    const { [key]: finalValue } = obj2;
    if (finalValue !== value) {
      return { ...acc, [` - ${key}`]: value };
    }
    if (startValue === finalValue) {
      return { ...acc, [`   ${key}`]: value };
    }
    return { ...acc, [` + ${key}`]: value };
  }, {});

  const result = Object
    .entries(difference)
    .map((entry) => entry.join(': '))
    .join('\n');

  return `{\n${result}\n}`;
};

export default genDiff;
