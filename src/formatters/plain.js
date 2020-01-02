const outputValues = {
  string: (value) => `'${value}'`,
  number: (value) => value,
  object: () => '[complex value]',
  boolean: (value) => value,
};

const getOutputValue = (value) => outputValues[(typeof value)](value);

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
  unchanged: () => null,
  nested: ({ key, children }, fn) => fn(children, key),
};

const getOutput = (type) => outputs[type];

const buildOutput = (data, ...ancestry) => (
  data
    .map((node) => {
      const { key, type } = node;
      const makeOutput = getOutput(type);
      const currentKey = [...ancestry, key].join('.');

      return makeOutput({ ...node, key: currentKey }, buildOutput);
    })
    .filter((node) => node !== null)
    .join('\n')
);

export default buildOutput;
