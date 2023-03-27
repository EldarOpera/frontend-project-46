import _ from 'lodash';
import parse from './parsers.js';
import buildASTtree from './buildASTtree.js'
import makeFormat from './formatters/makeFormat.js'
import { getPath } from './helpers.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const absPath1 = getPath(path1);
  const absPath2 = getPath(path2);
  const obj1 = parse(absPath1);
  const obj2 = parse(absPath2);
  const diffTree = buildASTtree(obj1, obj2);

  return format(diffTree, format);
};

export default genDiff;
