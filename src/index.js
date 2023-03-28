import path from 'path';
import parse from './parsers.js';
import buildASTtree from './buildASTtree.js';
import format from './formatters/index.js';
import path from 'path';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const absPath1 = path.resolve(path1);
  const absPath2 = path.resolve(path2);
  const obj1 = parse(absPath1);
  const obj2 = parse(absPath2);
  const diffTree = buildASTtree(obj1, obj2);

  return format(diffTree, formatName);
};

export default genDiff;
