const indentStep = 2;
const getSpaces = (val) => ' '.repeat(val * indentStep);

const stringify = (key, value, level) => {
  const firstIndent = getSpaces(level);

  if (!(value instanceof Object)) {
    return [firstIndent, `${key}: ${value}`].join('');
  }

  const lastIndent = getSpaces(level + 1);
  const newValue = Object
    .entries(value)
    .map(([curKey, curValue]) => {
      if (curValue instanceof Object) {
        return stringify(curKey, curValue, level + 3);
      }

      const curFirstIndent = getSpaces(level + 3);
      return [curFirstIndent, `${curKey}: ${curValue}`].join('');
    })
    .join('\n');

  return [`${firstIndent}${key}: {`, newValue, `${lastIndent}}`].join('\n');
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
