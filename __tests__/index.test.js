import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import { getDir, readFile } from '../src/helpers.js';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = getDir(__filename);

const paths = [
  path.resolve(__dirname, '../__fixtures__', 'recursive1.json'),
  path.resolve(__dirname, '../__fixtures__', 'recursive2.json'),
  path.resolve(__dirname, '../__fixtures__', 'recursive1.yaml'),
  path.resolve(__dirname, '../__fixtures__', 'recursive2.yaml'),
  path.resolve(__dirname, '../__fixtures__', 'stylish_expected.txt'),
  path.resolve(__dirname, '../__fixtures__', 'plain_expected.txt'),
];

const stylishResultJson = genDiff(paths[0], paths[1]);
const stylishResultYaml = genDiff(paths[2], paths[3]);
const plainResultJson = genDiff(paths[0], paths[1], 'plain');
const plainResultYaml = genDiff(paths[2], paths[3], 'plain');

const stylishExpected = readFile(paths[4]);
const plainExpected = readFile(paths[5]);

describe('gendiff test', () => {
  test.each([
    [stylishResultJson, stylishResultYaml, stylishExpected],
    [plainResultJson, plainResultYaml, plainExpected],
  ])('stylish && plain formats', (result1, result2, expected) => {
    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
  });

  test('json format', () => {
    const data = genDiff(paths[0], paths[1], 'json');
    expect(() => JSON.parse(data)).not.toThrow();
  });
});
