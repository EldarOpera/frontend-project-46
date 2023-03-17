import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('flat .json test', () => {
  const filepath1 = getFixturePath('flat_file1.json');
  const filepath2 = getFixturePath('flat_file2.json');
  const expected = readFile('expected_json.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
