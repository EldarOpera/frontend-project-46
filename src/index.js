import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const obj1 = JSON.parse(readFileSync(path.resolve(path1)));
  const obj2 = JSON.parse(readFileSync(path.resolve(path2)));
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  let res = '{';

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        res += `\n  - ${key}: ${obj1[key]}`;
        res += `\n  + ${key}: ${obj2[key]}`;
      } else {
        res += `\n    ${key}: ${obj1[key]}`;
      }
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      res += `\n  - ${key}: ${obj1[key]}`;
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      res += `\n  + ${key}: ${obj2[key]}`;
    }
  }

  return `${res}\n}\n`;
};

export default genDiff;
