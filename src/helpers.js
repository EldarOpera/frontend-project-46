import { readFileSync } from 'fs';
import path from 'path';

const getPath = (filename, ...dirs) => path.resolve(dirs.join('/'), filename);

const readFile = (filepath) => readFileSync(filepath, 'utf-8');

export {
  getPath,
  readFile,
};
