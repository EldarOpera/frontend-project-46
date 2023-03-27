import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { getPath, getDir, readFile } from '../src/helpers.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = getDir(__filename);

const stylishExpected = readFile(getPath(__dirname, '../__fixtures__', 'stylish_expected.txt'));
const plainExpected = readFile(getPath(__dirname, '../__fixtures__', 'plain_expected.txt'));

test('JSON diff test', () => {
  const filepath1 = getPath(__dirname, '../__fixtures__', 'recursive1.json');
  const filepath2 = getPath(__dirname, '../__fixtures__', 'recursive2.json');

  expect(genDiff(filepath1, filepath2)).toEqual(stylishExpected);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainExpected);
});

test('YAML diff test', () => {
  const filepath1 = getPath(__dirname, '../__fixtures__', 'recursive1.yaml');
  const filepath2 = getPath(__dirname, '../__fixtures__', 'recursive2.yaml');

  expect(genDiff(filepath1, filepath2)).toEqual(stylishExpected);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainExpected);
});
