import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': (content) => JSON.parse(content),
  '.yml': (content) => yaml.safeLoad(content),
  '.ini': (content) => ini.parse(content),
};

const getExt = (filepath) => path.extname(filepath);
const getParser = (type) => parsers[type];

const getWorkdir = () => process.cwd();
const getAbspath = (dirpath, filepath) => path.join(dirpath, filepath);
const getContent = (filepath) => fs.readFileSync(filepath, 'utf-8');

export default (filepath) => {
  const parse = getParser(getExt(filepath));

  const absFilepath = getAbspath(getWorkdir(), filepath);
  const content = getContent(absFilepath);

  return parse(content);
};
