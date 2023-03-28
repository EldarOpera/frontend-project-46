import _ from 'lodash';

const normalize = (data) => {
  if (_.isObject(data)) {
    const entries = _.entries(data);
    const lines = entries.map(([key, value]) => `"${key}":${normalize(value)}`);
    return ['{', lines.join(','), '}'].join('');
  }
  if (typeof (data) === 'string') {
    return `"${data}"`;
  }

  return data;
};

const formatJson = (diffTree) => {
  const iter = (data) => {
    const lines = data.map((node) => {
      const {
        key, type, value, oldValue, newValue, children
      } = node;
      const generalCase = `{"key":"${key}","type":"${type}","value":${normalize(value)}}`;

      switch (type) {
        case 'nested':
          return `{"key":"${key}","type":"${type}","children":${iter(children)}}`;
        case 'changed':
          return `{"key":"${key}","type":"${type}","oldValue":${normalize(oldValue)},"newValue":${normalize(newValue)}}`;
        case 'added':
          return generalCase;
        case 'deleted':
          return generalCase;
        case 'unchanged':
          return generalCase;
        default:
          throw new Error(`Unknown node type: ${type}.`);
      }
    });

    return ['[', lines.join(','), ']'].join('');
  };

  return iter(diffTree);
};

export default formatJson;
