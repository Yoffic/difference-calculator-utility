import getComplex from './complex';
import getPlain from './plain';
import getJson from './json';

const outputType = {
  plain: (data) => getPlain(data),
  json: (data) => getJson(data),
  complex: (data) => getComplex(data),
};

export default (data, format) => outputType[format](data);
