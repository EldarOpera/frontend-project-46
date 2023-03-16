import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('flat JSON test', () => {
  const filepath1 = getFixturePath('flat_file1.json');
  const filepath2 = getFIxturePath('flat_file2.json');
  const expectedFilePath = getFixturePath('expected_json.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(readFileSync(expectedFilePath), 'utf-8');
});
