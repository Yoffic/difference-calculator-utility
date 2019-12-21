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
const getParser = (extname) => parsers[extname];

const getCurDirpath = () => process.cwd();
const getAbsPath = (filepath, curDirpath) => path.join(curDirpath, filepath);
const getContent = (filepath) => fs.readFileSync(filepath, 'utf-8');

export default (filepath) => {
  const extname = getExt(filepath);
  const parser = getParser(extname);

  const curDirpath = getCurDirpath();
  const absFilepath = getAbsPath(filepath, curDirpath);
  const content = getContent(absFilepath);

  return parser(content);
};
