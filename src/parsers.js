import yaml from 'js-yaml';
import { getExtension } from './helpers.js';

const parse = (path, data) => {
  const extension = getExtension(path);

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
