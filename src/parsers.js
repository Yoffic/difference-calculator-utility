import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = [
  {
    name: '.json',
    process: (content) => JSON.parse(content),
  },
  {
    name: '.yml',
    process: (content) => yaml.safeLoad(content),
  },
];

const getContent = (filePath) => fs.readFileSync(path.join(process.cwd(), filePath));

const getExt = (file) => path.extname(file);

const getParser = (file) => parser.find(({ name }) => name === getExt(file));

export default (filePath) => {
  const { process } = getParser(filePath);
  return process(getContent(filePath));
};
