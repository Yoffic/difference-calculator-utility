import getComplex from './complex';
import getPlain from './plain';
import getJson from './json';

export default (data, format) => {
  if (format === 'plain') return getPlain(data);
  if (format === 'json') return getJson(data);
  return getComplex(data);
};
