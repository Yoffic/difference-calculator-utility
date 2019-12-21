import { has, union } from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2)).sort();
  const diff = keys.map((key) => {
    if (!has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (data1[key] instanceof Object && data2[key] instanceof Object) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }

    if (data1[key] !== data2[key]) {
      return {
        key, type: 'updated', prevValue: data1[key], curValue: data2[key],
      };
    }

    return { key, type: 'unchanged', value: data2[key] };
  });
  return diff;
};

export default buildDiff;
