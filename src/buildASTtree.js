import _ from 'lodash';

const buildASTtree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const astTree = sortedKeys.map((key) => {
    // ключи присутствуют в обоих файлах
    if (_.has(obj1, key) && _.has(obj2, key)) {
      // оба значения - объекты
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { key, type: 'nested', children: buildASTtree(obj1[key], obj2[key]) };
      }
      // значения - разные
      if (obj1[key] !== obj2[key]) {
        return {
          key, type: 'changed', value1: obj1[key], value2: obj2[key],
        };
      }
    }
    // ключ присутствует в одном из файлов
    // только во втором (добавился)
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    // только в первом (удалился)
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    // ключ остался без изменений
    return { key, type: 'unchanged', value: obj1[key] };
  });

  return astTree;
};

export default buildASTtree;
