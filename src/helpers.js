import path from 'path';
import { readFileSync } from 'fs';

const getPath = (...filepath) => path.resolve(filepath.join('/'));

const getDir = (filepath) => path.dir(filepath);

const getExtension = (filepath) => path.extname(filepath);

const readFile = (filepath) => readFileSync(filepath, 'utf-8');

export {
  getPath,
  getDir,
  getExtension,
  readFile,
};
