import { join, resolve } from 'path';
import { rimrafSync } from 'rimraf';
import { mkdirSync, readFileSync } from 'fs';

import { sevenUnzipSync } from '../src/sevenUnzipSync';
import { sevenZipSync } from '../src/sevenZipSync';

import { TEMP_DIR } from './teardown';

const ZIP_TEMP_DIR = join(TEMP_DIR, 'zipSync');

describe('Test sevenZipSync function', () => {
  beforeAll(() => {
    mkdirSync(ZIP_TEMP_DIR, { recursive: true });
  });

  test('recompresses extracted files into a new 7z archive and verifies it matches the original', () => {
    const archive = resolve('tests', 'data', `test ${process.platform}.7z`);
    sevenUnzipSync(archive, ZIP_TEMP_DIR);

    const paths = ['inner folder', 'test 1.txt', 'test 2.txt'].map(file =>
      join(ZIP_TEMP_DIR, file)
    );

    const destination = join(ZIP_TEMP_DIR, `test ${process.platform}.7z`);
    sevenZipSync(paths, destination);

    const actual = readFileSync(destination);
    const expected = readFileSync(archive);
    expect(actual).toEqual(expected);
  });

  afterAll(() => {
    rimrafSync(ZIP_TEMP_DIR);
  });
});
