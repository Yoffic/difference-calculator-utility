import { isObject } from 'lodash';

export const getSpaces = (val) => ' '.repeat(val * 2);

const stringifyNested = (value, level) => {
  const newValues = Object.entries(value)
    .map((entry) => {
      const [key, curValue] = entry;
      return isObject(curValue)
        ? `${getSpaces(level + 1)}${stringifyNested(curValue, level + 2)}`
        : `${getSpaces(level + 1)}${key}: ${curValue}`;
    }).join('\n');
  return newValues;
};

export const stringify = (key, value, level) => {
  if (isObject(value)) {
    return `${getSpaces(level)}${key}: {\n${stringifyNested(value, level + 2)}\n${getSpaces(level + 1)}}`;
  }
  return `${getSpaces(level)}${key}: ${value}`;
};
