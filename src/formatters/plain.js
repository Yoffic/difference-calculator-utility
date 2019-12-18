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

const buildPlain = (data, parent = '') => {
  const allValues = data.reduce((acc, node) => {
    const {
      key,
      type,
      value,
      children,
    } = node;
    const getOutput = plainTypes[type];
    const curKey = `${parent}${key}`;

    if (children) {
      return [...acc, buildPlain(children, `${curKey}.`)];
    }

    if (Array.isArray(value)) {
      const values = value.map((item) => {
        const valueType = typeof item;
        return valueTypes[valueType](item);
      });

      return [...acc, getOutput(curKey, values)];
    }

    const valueType = typeof value;
    const outputValue = valueTypes[valueType](value);
    return [...acc, getOutput(curKey, outputValue)];
  }, []);

  return allValues.flat().join('\n');
};

export default (data) => buildPlain(data);
