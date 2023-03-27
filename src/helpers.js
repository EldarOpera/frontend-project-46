import path from 'path';
import { readFileSync } from 'fs';

const getPath = (...filepath) => path.resolve(filepath.join('/'));

const getDir = (filepath) => path.dirname(filepath);

const readFile = (filepath) => readFileSync(filepath, 'utf-8');

const getExtension = (filepath) => path.extname(filepath);

export {
  getPath,
  getDir,
  readFile,
  getExtension,
};
