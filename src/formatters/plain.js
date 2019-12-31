/* eslint-disable no-use-before-define */

const valueOutputs = {
  string: (value) => `'${value}'`,
  number: (value) => value,
  object: () => '[complex value]',
  boolean: (value) => value,
};

const getOutputValue = (value) => valueOutputs[(typeof value)](value);

const outputs = {
  added: ({ key, value }) => {
    const outputValue = getOutputValue(value);
    return `Property '${key}' was added with value: ${outputValue}`;
  },
  removed: ({ key }) => `Property '${key}' was removed`,
  updated: ({ key, valueBefore, valueAfter }) => {
    const outputValue1 = getOutputValue(valueBefore);
    const outputValue2 = getOutputValue(valueAfter);
    return `Property '${key}' was updated. From ${outputValue1} to ${outputValue2}`;
  },
  unchanged: () => [],
  nested: ({ key, children }) => buildOutput(children, `${key}.`),
};

const getOutput = (type) => outputs[type];

const buildOutput = (data, parent = '') => (
  data.flatMap((node) => {
    const { key, type } = node;
    const output = getOutput(type);

    return output({ ...node, key: `${parent}${key}` });
  }).join('\n')
);

export default buildOutput;
