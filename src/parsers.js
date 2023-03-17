import path from 'path';
import yaml from 'js-yaml';
import { readFile } from './helpers.js';

const parse = (filepath) => {
  const extension = path.extname(filepath);
  let parseFn;

  switch (extension) {
    case '.json':
      parseFn = JSON.parse;
      break;
    case '.yml':
      parseFn = yaml.safeLoad;
      break;
    case '.yaml':
      parseFn = yaml.safeLoad;
      break;
    default:
      return `Unknown extension: ${extension}`;
  }

  const data = readFile(filepath);
  return parseFn(data);
};

export default parse;
