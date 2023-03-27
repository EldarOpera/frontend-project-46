import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { getPath, getDir, readFile } from '../src/helpers.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = getDir(__filename);

test('JSON stylish genDiff test', () => {
  const filepath1 = getPath(__dirname, '../__fixtures__', 'recursive1.json');
  const filepath2 = getPath(__dirname, '../__fixtures__', 'recursive2.json');
  const expectedJSON = readFile(getPath(__dirname, '../__fixtures__', 'stylish_expected.txt'));

  expect(genDiff(filepath1, filepath2)).toEqual(expectedJSON);
});

test('YAML stlylish genDiff test', () => {
  const filepath1 = getPath(__dirname, '../__fixtures__', 'recursive1.yaml');
  const filepath2 = getPath(__dirname, '../__fixtures__', 'recursive2.yaml');
  const expectedYAML = readFile(getPath(__dirname, '../__fixtures__', 'stylish_expected.txt'));

  expect(genDiff(filepath1, filepath2)).toEqual(expectedYAML);
});
