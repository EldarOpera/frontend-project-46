import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (data, format) => {
  if (!Object.hasOwn(parsers, format)) {
    throw new Error(`Unknown parser format: ${format}`);
  }

  return parsers[format](data);
};

export default parse;
