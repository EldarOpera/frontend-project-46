import formatStylish from './stylish.js';
import formatPlain from './plain.js'

const format = (diffTree, formatName) => {
  switch (format) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    default:
      throw new Error(`Unknown formatter name: ${format}`);
  }
};

export default makeFormat;
