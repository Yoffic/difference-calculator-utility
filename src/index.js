import parse from './parsers';
import buildDiff from './buildDiff';
import getOutput from './output';

const genDiff = (filePath1, filePath2) => {
  const data1 = parse(filePath1);
  const data2 = parse(filePath2);
  const difference = buildDiff(data1, data2);
  return getOutput(difference);
};

export default genDiff;
