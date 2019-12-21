/* eslint-disable no-use-before-define */
import { getSpaces, stringify } from '../stringify';

const outputs = {
  added: ({ key, value }, level) => stringify(`+ ${key}`, value, level),
  removed: ({ key, value }, level) => stringify(`- ${key}`, value, level),
  unchanged: ({ key, value }, level) => stringify(`  ${key}`, value, level),
  updated: ({ key, valueBefore, valueAfter }, level) => (
    [stringify(`- ${key}`, valueBefore, level), stringify(`+ ${key}`, valueAfter, level)].join('\n')
  ),
  nested: ({ key, children }, level) => {
    const value = `{\n${buildOutput(children, level + 2)}\n${getSpaces(level + 1)}}`;
    return stringify(`  ${key}`, value, level);
  },
};

const getOutput = (type) => outputs[type];

const buildOutput = (data, level = 1) => data.map((node) => {
  const { type } = node;
  const output = getOutput(type);

  return output(node, level);
}).join('\n');

export default (data) => `{\n${buildOutput(data)}\n}`;
