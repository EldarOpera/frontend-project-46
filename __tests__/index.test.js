import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import { getDir, readFile } from '../src/helpers.js';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = getDir(__filename);

const stylishExpected = readFile(path.resolve(__dirname, '../__fixtures__', 'stylish_expected.txt'));
const plainExpected = readFile(path.resolve(__dirname, '../__fixtures__', 'plain_expected.txt'));
// const jsonExpected = readFile(path.resolve(__dirname, '../__fixtures__', 'json_expected.txt'));

test('JSON diff test', () => {
  const filepath1 = path.resolve(__dirname, '../__fixtures__', 'recursive1.json');
  const filepath2 = path.resolve(__dirname, '../__fixtures__', 'recursive2.json');

  expect(genDiff(filepath1, filepath2)).toEqual(stylishExpected);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainExpected);
  // expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonExpected);
});

test('YAML diff test', () => {
  const filepath1 = path.resolve(__dirname, '../__fixtures__', 'recursive1.yaml');
  const filepath2 = path.resolve(__dirname, '../__fixtures__', 'recursive2.yaml');

  expect(genDiff(filepath1, filepath2)).toEqual(stylishExpected);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainExpected);
  // expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonExpected);
});
