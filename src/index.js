import parse from './parsers';
import buildDiff from './buildDiff';
import getOutput from './formatters';

const genDiff = (path1, path2, format = 'complex') => {
  const data1 = parse(path1);
  const data2 = parse(path2);
  const difference = buildDiff(data1, data2);

  return getOutput(difference, format);
};

export default genDiff;
