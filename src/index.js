import { has, uniq } from 'lodash';
import parse from './parsers';

const getDiff = (data1, data2) => {
  const keys = uniq(Object.keys(data1).concat(Object.keys(data2))).sort();
  const diff = keys.map((key) => {
    if (!has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (data1[key] instanceof Object && data2[key] instanceof Object) {
      return {
        key,
        type: 'unchanged',
        children: getDiff(data1[key], data2[key]),
      };
    }

    if (data1[key] !== data2[key]) {
      return {
        key,
        type: 'updated',
        value: [data1[key], data2[key]],
      };
    }

    return {
      key,
      type: 'unchanged',
      value: data2[key],
    };
  });
  return diff;
};

const genDiff = (filePath1, filePath2) => {
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  const difference = getDiff(obj1, obj2);

  const types = {
    added: (key, value) => ` + ${key}: ${value}`,
    removed: (key, value) => ` - ${key}: ${value}`,
    unchanged: (key, value) => `   ${key}: ${value}`,
    updated: (key, value) => ` - ${key}: ${value[0]}\n + ${key}: ${value[1]}`,
  };

  const buildDiff = (data) => (data.map((item) => {
    const {
      key,
      type,
      children,
      value,
    } = item;
    if (children) {
      return `${types[type](key, '{')}\n   ${buildDiff(children)}\n   }`;
    }
    if (types[type] !== undefined) {
      return types[type](key, value);
    }
    return `   ${key}: ${value}`;
  }).join('\n'));

  return `{\n${buildDiff(difference)}\n}`;
};

export default genDiff;
