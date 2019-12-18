export const getSpaces = (val) => ' '.repeat(val * 2);

const stringifyNested = (value, level) => (
  Object.entries(value)
    .map(([key, curValue]) => (
      curValue instanceof Object
        ? `${getSpaces(level + 1)}${stringifyNested(curValue, level + 2)}`
        : `${getSpaces(level + 1)}${key}: ${curValue}`
    )).join('\n')
);

export const stringify = (key, value, level) => (
  value instanceof Object
    ? `${getSpaces(level)}${key}: {\n${stringifyNested(value, level + 2)}\n${getSpaces(level + 1)}}`
    : `${getSpaces(level)}${key}: ${value}`
);
