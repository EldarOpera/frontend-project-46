import _ from 'lodash';

const buildASTtree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const astTree = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    // если оба значения - объекты
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: buildASTtree(value1, value2) };
    }
    // если ключ добавился
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: value2 };
    }
    // если ключ удалился
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: value1 };
    }
    // если значение изменилось
    if (value1 !== value2) {
      return { key, type: 'changed', oldValue: value1, newValue: value2 };
    }

    return { key, type: 'unchanged', value: value1 };
  });

  return astTree;
};

export default buildASTtree;
