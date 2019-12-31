import getComplex from './complex';
import getPlain from './plain';
import getJson from './json';

const outputType = {
  plain: getPlain,
  json: getJson,
  complex: getComplex,
};

export default (data, format) => outputType[format](data);
