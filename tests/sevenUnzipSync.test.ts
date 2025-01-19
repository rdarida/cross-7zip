import { join, resolve } from 'path';
import { rimrafSync } from 'rimraf';
import { existsSync, mkdirSync } from 'fs';

import { sevenUnzipSync } from '../src/sevenUnzipSync';

import { TEMP_DIR } from './constants';

const UNZIP_TEMP_DIR = join(TEMP_DIR, 'unzipSync');

xdescribe('Test sevenUnzipSync function', () => {
  beforeAll(() => {
    mkdirSync(UNZIP_TEMP_DIR, { recursive: true });
  });

  test('extracts files from a 7z archive and verifies their existence', () => {
    const archive = resolve('tests', 'data', `test ${process.platform}.7z`);
    sevenUnzipSync(archive, UNZIP_TEMP_DIR);

    [
      'inner folder',
      'inner folder/inner test 1.md',
      'inner folder/inner test 2.md',
      'test 1.txt',
      'test 2.txt'
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
