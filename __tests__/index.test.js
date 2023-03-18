import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { getPath, getDir, readFile } from '../src/helpers.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url); // /home/runner/work/frontend-project-46/__tests__/index.test.js
const __dirname = getDir(__filename); // /home/runner/work/frontend-project-46/__tests__

test('flat .json test', () => {
  const filepath1 = getPath(__dirname, '../__fixtures__', 'flat1.json');
  const filepath2 = getPath(__dirname, '../__fixtures__', 'flat2.json');
  const expectedJSON = readFile(getPath(__dirname, '../__fixtures__', 'flat_expected.txt'));

  expect(genDiff(filepath1, filepath2)).toEqual(expectedJSON);
});

test('flat .yml test', () => {
  const filepath1 = getPath(__dirname, '../__fixtures__', 'flat1.yml');
  const filepath2 = getPath(__dirname, '../__fixtures__', 'flat2.yml');
  const expectedYML = readFile(getPath(__dirname, '../__fixtures__', 'flat_expected.txt'));

  expect(genDiff(filepath1, filepath2)).toEqual(expectedYML);
});
