import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (data, format) => {
  switch (Object.hasOwn(parsers, format)) {
    case true:
      return parsers[format](data);
    default:
      throw new Error(`Unknown parser format: ${format}`);
  }
};

export default parse;
