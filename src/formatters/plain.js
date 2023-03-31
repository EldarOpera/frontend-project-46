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
          path.push(key);
          return iter(node.children, path);
        case 'changed':
          return `Property '${path.join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'added':
          return `Property '${path.join('.')}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${path.join('.')}' was removed`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown node type: '${type}'`);
      }
    });

    return lines.join('\n');
  };

  return iter(diffTree, []);
};

export default formatPlain;
