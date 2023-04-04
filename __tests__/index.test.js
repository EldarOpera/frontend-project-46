import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

const paths = {
  json1: getFixturePath('recursive1.json'),
  json2: getFixturePath('recursive2.json'),
  yaml1: getFixturePath('recursive1.yaml'),
  yaml2: getFixturePath('recursive2.yaml'),
  stylishExpected: getFixturePath('stylish_expected.txt'),
  plainExpected: getFixturePath('plain_expected.txt'),
};

const stylishExpected = readFileSync(paths.stylishExpected, 'utf-8');
const plainExpected = readFileSync(paths.plainExpected, 'utf-8');

describe('gendiff test', () => {
  test.each([
    [genDiff(paths.json1, paths.json2), stylishExpected],
    [genDiff(paths.json1, paths.json2, 'stylish'), stylishExpected],
    [genDiff(paths.json1, paths.json2, 'plain'), plainExpected],
    [genDiff(paths.yaml1, paths.yaml2), stylishExpected],
    [genDiff(paths.yaml1, paths.yaml2, 'stylish'), stylishExpected],
    [genDiff(paths.yaml1, paths.yaml2, 'plain'), plainExpected],
  ])('stylish && plain formats', (result, expected) => {
    expect(result).toEqual(expected);
  });

  test.each([
    genDiff(paths.json1, paths.json2, 'json'),
    gendiff(paths.yaml1, paths.yaml2, 'json'),
  ])('json format', (result) => {
    expect(() => JSON.parse(result)).not.toThrow();
  });
});
