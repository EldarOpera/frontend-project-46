import yaml from 'js-yaml';
import { readFile, getExtension } from './helpers.js';

const parse = (filepath) => {
  const extension = getExtension(filepath);
  const data = readFile(filepath);

  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension: ${extension}`);
  }
};

export default parse;
