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
      parseFn = yaml.safe;
      break;
    case '.yaml':
      parseFn = yaml.safe;
      break;
    default:
      return `Unknown extension: ${extension}`;
  }

  const data = readFile(filepath);
  return parseFn(data);
};

export default parse;
