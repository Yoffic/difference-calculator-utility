const valueTypes = {
  string: (value) => `'${value}'`,
  number: (value) => value,
  object: (value) => (Array.isArray(value) ? value : '[complex value]'),
  boolean: (value) => value,
};

const plainTypes = {
  added: (key, value) => `Property '${key}' was added with value: ${value}`,
  removed: (key) => `Property '${key}' was removed`,
  updated: (key, [value1, value2]) => (`Property '${key}' was updated. From ${value1} to ${value2}`),
  unchanged: () => [],
};

const buildPlain = (data, parent = '') => (
  data.reduce((acc, node) => {
    const {
      key,
      type,
      value,
      children,
    } = node;
    const getOutput = plainTypes[type];
    const currentKey = `${parent}${key}`;

    if (children) {
      return [...acc, buildPlain(children, `${currentKey}.`)];
    }

    if (Array.isArray(value)) {
      const values = value.map((subValue) => (
        valueTypes[(typeof subValue)](subValue)
      ));

      return [...acc, getOutput(currentKey, values)];
    }

    const outputValue = valueTypes[(typeof value)](value);
    return [...acc, getOutput(currentKey, outputValue)];
  }, []).flat().join('\n')
);

export default (data) => buildPlain(data);
