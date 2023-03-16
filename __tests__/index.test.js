import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('flat JSON test', () => {
    const filepath1 = getPath('flat_file1.json');
    const filepath2 = getPath('flat_file2.json');
    const expectedFilepath = getPath('expected_json.txt');
    
    expect(genDiff(filepath1, filepath2)).toEqual(readFileSync(expectedFilepath));
});