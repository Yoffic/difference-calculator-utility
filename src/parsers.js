import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = [
  {
    name: '.json',
    process: (content) => JSON.parse(content),
  },
  {
    name: '.yml',
    process: (content) => yaml.safeLoad(content),
  },
  {
    name: '.ini',
    process: (content) => ini.parse(content),
  },
];

const getContent = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');

const getExt = (file) => path.extname(file);

const getParser = (file) => parsers.find(({ name }) => name === getExt(file));

export default (filePath) => {
  const { process } = getParser(filePath);
  return process(getContent(filePath));
};
