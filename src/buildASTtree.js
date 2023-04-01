import _ from 'lodash';

const buildASTtree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const astTree = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: buildASTtree(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    }

    return { key, type: 'unchanged', value: obj1[key] };
  });

  return astTree;
};

export default buildASTtree;
