import path from 'path';
import { readFileSync } from 'fs';

const getDir = (filepath) => path.dirname(filepath);

const readFile = (filepath) => readFileSync(filepath, 'utf-8');

const getExtension = (filepath) => path.extname(filepath);

export {
  getDir,
  readFile,
  getExtension,
};
