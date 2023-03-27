import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount - 2);
const getBracketIndent = (depth) => replacer.repeat(depth * spacesCount - spacesCount);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = _.entries(data);
  const lines = entries.map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);

  return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
};

const formatStylish = (diffTree) => {
  const iter = (data, depth) => {
    const lines = data.map((node) => {
      const {
        key, type, value, oldValue, newValue, children,
      } = node;

      switch (type) {
        case 'nested':
          return `${getIndent(depth)}  ${key}: ${iter(children, depth + 1)}`;
        case 'added':
          return `${getIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}\n${getIndent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        default:
          throw new Error(`Unknown node type: ${type}.`);
      }
    });

    return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(diffTree, 1);
};

export default formatStylish;
