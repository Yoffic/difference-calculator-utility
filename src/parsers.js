import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getContent = (filePath) => fs.readFileSync(path.join(process.cwd(), filePath));
const getExt = (filePath) => path.extname(filePath);

const parser = {
  '.json': (content) => JSON.parse(content),
  '.yml': (content) => yaml.safeLoad(content),
};

export default (filePath) => parser[getExt(filePath)](getContent(filePath));
