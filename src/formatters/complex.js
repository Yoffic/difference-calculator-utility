import { getSpaces, stringify } from '../stringify';

const types = {
  added: ({ key, value }, level) => stringify(`+ ${key}`, value, level),
  removed: ({ key, value }, level) => stringify(`- ${key}`, value, level),
  unchanged: ({ key, value }, level) => stringify(`  ${key}`, value, level),
  updated: ({ key, value }, level) => {
    const [value1, value2] = value;
    return [stringify(`- ${key}`, value1, level), stringify(`+ ${key}`, value2, level)].join('\n');
  },
};

const buildOutput = (data, level = 1) => data.map((item) => {
  const { type, children } = item;
  const func = types[type];

  if (children) {
    const value = `{\n${buildOutput(children, level + 2)}\n${getSpaces(level + 1)}}`;
    return func({ key: item.key, value }, level);
  }
  return func(item, level);
}).join('\n');

export default (data) => `{\n${buildOutput(data)}\n}`;
