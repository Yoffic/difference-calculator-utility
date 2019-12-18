import getComplex from './complex';
import getPlain from './plain';

export default (data, format) => {
  if (format === 'plain') {
    return getPlain(data);
  }

  return getComplex(data);
};
