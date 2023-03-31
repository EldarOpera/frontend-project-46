import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }

  return value;
};

const formatPlain = (diffTree) => {
  const iter = (data, path) => {
    const lines = data.flatMap((node) => {
      const { key, type } = node;

      switch (type) {
        case 'nested':
          const { children } = node;
          return iter(children, `${path}${key}.`);
        case 'changed':
          const { value1, value2 } = node;
          return `Property '${path}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'added':
          const { value } = node;
          return `Property '${path}${key}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${path}${key}' was removed`;
        default:
          return [];
      }
    });

    return lines.join('\n');
  };

  return iter(diffTree, '');
};

export default formatPlain;
