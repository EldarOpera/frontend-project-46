import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return String(value);
};

const formatPlain = (diffTree) => {
  const iter = (data, path) => {
    const lines = data.flatMap((node) => {

      switch (type) {
        case 'nested':
          const { key, children } = node;
          return iter(children, `${path}${key}.`);
        case 'added':
          const { key, value } = node;
          return `Property '${path}${key}' was added with value: ${stringify(value)}`;
        case 'deleted':
          const { key } = node;
          return `Property '${path}${key}' was removed`;
        case 'changed':
          const { key, value1, value2 } = node;
          return `Property '${path}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        default:
          return [];
      }
    });

    return lines.join('\n');
  };

  return iter(diffTree, '');
};

export default formatPlain;
