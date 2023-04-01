import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const formatPlain = (diffTree) => {
  const iter = (data, path) => {
    const lines = data.flatMap((node) => {
      const { key, type } = node;
      const newPath = path.concat(key);
      const strPath = newPath.join('.');

      switch (type) {
        case 'nested':
          return iter(node.children, newPath);
        case 'changed':
          return `Property '${strPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'added':
          return `Property '${strPath}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${strPath}' was removed`;
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
