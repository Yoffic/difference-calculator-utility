const getSpaces = (val) => ' '.repeat(val * 2);

const stringifyNested = (data, level) => (
  Object.entries(data)
    .map(([key, value]) => {
      const indent = getSpaces(level + 1);
      if (value instanceof Object) {
        return [`${indent}${key}: {`, stringifyNested(value, level + 1), `${indent}}`].join('\n');
      }

      return [indent, `${key}: ${value}`].join('');
    }).join('\n')
);

const stringify = (key, value, level) => {
  const firstIndent = getSpaces(level);
  const lastIndent = getSpaces(level + 1);

  if (value instanceof Object) {
    return [`${firstIndent}${key}: {`, stringifyNested(value, level + 2), `${lastIndent}}`].join('\n');
  }

  return [firstIndent, `${key}: ${value}`].join('');
};

const outputs = {
  added: ({ key, value }, level) => stringify(`+ ${key}`, value, level),
  removed: ({ key, value }, level) => stringify(`- ${key}`, value, level),
  unchanged: ({ key, value }, level) => stringify(`  ${key}`, value, level),
  updated: ({ key, valueBefore, valueAfter }, level) => (
    [stringify(`- ${key}`, valueBefore, level), stringify(`+ ${key}`, valueAfter, level)].join('\n')
  ),
  nested: ({ key, children }, level, fn) => {
    const value = ['{', fn(children, level + 2), `${getSpaces(level + 1)}}`].join('\n');
    return stringify(`  ${key}`, value, level);
  },
};

const getOutput = (type) => outputs[type];

const buildOutput = (data, level = 1) => data.map((node) => {
  const { type } = node;
  const makeOutput = getOutput(type);

  return makeOutput(node, level, buildOutput);
}).join('\n');

export default (data) => `{\n${buildOutput(data)}\n}`;
