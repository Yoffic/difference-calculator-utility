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

const getOutput = (data, level = 1) => data.map((node) => {
  const { type, children } = node;
  const getStr = types[type];

  if (children) {
    const value = `{\n${getOutput(children, level + 2)}\n${getSpaces(level + 1)}}`;
    return getStr({ key: node.key, value }, level);
  }
  return getStr(node, level);
}).join('\n');

export default (data) => `{\n${getOutput(data)}\n}`;
