import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js'

const format = (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    case 'json':
      return formatJson(diffTree);
    default:
      throw new Error(`Unknown formatter name: ${format}`);
  }
};

export default format;
