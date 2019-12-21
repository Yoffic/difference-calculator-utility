import getComplex from './complex';
import getPlain from './plain';
import getJson from './json';

export default (data, format) => {
  switch (format) {
    case 'plain':
      return getPlain(data);
    case 'json':
      return getJson(data);
    case 'complex':
    default:
      return getComplex(data);
  }
};
