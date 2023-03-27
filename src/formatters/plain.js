import _ from 'lodash';

const normalize = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const formatPlain = (diffTree) => {
  const iter = (data, path) => {
    const lines = data.flatMap((node) => {
      const {
        key, type, value, oldValue, newValue, children,
      } = node;

      switch (type) {
        case 'nested':
          return iter(children, `${path}${key}.`);
        case 'added':
          return `Property '${path}${key}' was added with value: ${normalize(value)}`;
        case 'deleted':
          return `Property '${path}${key}' was removed`;
        case 'changed':
          return `Property '${path}${key}' was updated. From ${normalize(oldValue)} to ${normalize(newValue)}`;
        default:
          return [];
      }
    });

    return lines.join('\n');
  };

  return iter(diffTree, '');
};

export default formatPlain;
