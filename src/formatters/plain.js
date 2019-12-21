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
  updated: ({ key, prevValue, curValue }) => {
    const outputValue1 = getOutputValue(prevValue);
    const outputValue2 = getOutputValue(curValue);
    return `Property '${key}' was updated. From ${outputValue1} to ${outputValue2}`;
  },
  unchanged: () => [],
  nested: ({ key, children }) => buildOutput(children, `${key}.`),
};

const getOutput = (type) => outputs[type];

const buildOutput = (data, parent = '') => (
  data.reduce((acc, node) => {
    const { key, type } = node;
    const output = getOutput(type);

    return [...acc, output({ ...node, key: `${parent}${key}` })];
  }, []).flat().join('\n')
);

export default (data) => buildOutput(data);
