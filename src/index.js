import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import buildASTtree from './buildASTtree.js';
import format from './formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const absPath1 = path.resolve(path1);
  const absPath2 = path.resolve(path2);

  const data1 = readFileSync(absPath1, 'utf-8');
  const data2 = readFileSync(absPath2, 'utf-8');

  const parseFormat = path.extname(absPath1).slice(1);
  const obj1 = parse(data1, parseFormat);
  const obj2 = parse(data2, parseFormat);

  const diffTree = buildASTtree(obj1, obj2);

  return format(diffTree, formatName);
};

export default genDiff;
