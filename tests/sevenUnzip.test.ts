import { join, resolve } from 'path';
import { rimrafSync } from 'rimraf';
import { existsSync, mkdirSync } from 'fs';

import { sevenUnzip } from '../src/sevenUnzip';

import { TEMP_DIR, ZIP_PATH } from './constants';

const UNZIP_TEMP_DIR = join(TEMP_DIR, 'unzip');

describe('Test sevenUnzip function', () => {
  beforeAll(() => {
    mkdirSync(UNZIP_TEMP_DIR, { recursive: true });
  });

  test('extracts files from a 7z archive and verifies their existence', async () => {
    const archive = resolve(ZIP_PATH);
    await sevenUnzip(archive, UNZIP_TEMP_DIR);

    [
      'test file 1.txt',
      'test file 2.md',
      'inner dir/test file 3.txt',
      'inner dir/test file 4.md'
    ]
      .map(file => join(UNZIP_TEMP_DIR, file))
      .forEach(path => {
        expect(existsSync(path)).toBeTruthy();
      });
  });

  afterAll(() => {
    rimrafSync(UNZIP_TEMP_DIR);
  });
});
