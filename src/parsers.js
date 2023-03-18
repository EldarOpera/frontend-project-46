import yaml from 'js-yaml';
import { readFile, getExtension } from './helpers.js';

const parse = (filepath) => {
  const extension = getExtension(filepath);
  let parseFn;

  switch (extension) {
    case '.json':
      parseFn = JSON.parse;
      break;
    case '.yml':
      parseFn = yaml.load;
      break;
    case '.yaml':
      parseFn = yaml.load;
      break;
    default:
      return `Unknown extension: ${extension}`;
  }

  const data = readFile(filepath);
  return parseFn(data);
};

export default parse;
