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
  unchanged: () => '',
  nested: () => '',
};

const getOutput = (type) => outputs[type];

const buildOutput = (data) => {
  const iter = (tree, parent) => (
    tree
      .map((node) => {
        const { key, type, children } = node;
        if (type === 'nested') {
          return iter(children, `${parent}${key}.`);
        }
        const output = getOutput(type);

        return output({ ...node, key: `${parent}${key}` });
      })
      .filter((node) => node !== '')
      .join('\n')
  );

  return iter(data, '');
};

export default buildOutput;
