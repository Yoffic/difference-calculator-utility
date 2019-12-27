import { getType, getContent } from './utils';
import parse from './parsers';
import buildDiff from './buildDiff';
import getOutput from './formatters';

const genDiff = (path1, path2, format = 'complex') => {
  const filetype1 = getType(path1);
  const filetype2 = getType(path2);

  const content1 = getContent(path1);
  const content2 = getContent(path2);

  const data1 = parse(filetype1, content1);
  const data2 = parse(filetype2, content2);

  const difference = buildDiff(data1, data2);

  return getOutput(difference, format);
};

export default genDiff;
