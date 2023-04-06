import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

const stylishExpected = readFileSync(getFixturePath('stylish_expected.txt'), 'utf-8');
const plainExpected = readFileSync(getFixturePath('plain_expected.txt'), 'utf-8');

describe('gendiff test', () => {
  test.each(['json', 'yaml',])('stylish, plain, json formats', (format) => {
    const filepath1 = getFixturePath(`recursive1.${format}`);
    const filepath2 = getFixturePath(`recursive2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(stylishExpected);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishExpected);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainExpected);
    expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).not.toThrow();
  });
});
