import stylish from './stylish.js';

const makeFormat = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default makeFormat;
