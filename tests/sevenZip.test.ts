import { join } from 'path';
import { rimrafSync } from 'rimraf';
import { mkdirSync, readFileSync } from 'fs';

import { sevenUnzip } from '../src/sevenUnzip';
import { sevenZip } from '../src/sevenZip';

import { TEMP_DIR, ZIP_PATH } from './constants';

const ZIP_TEMP_DIR = join(TEMP_DIR, 'zip');

describe('Test sevenZip function', () => {
  beforeAll(() => {
    mkdirSync(ZIP_TEMP_DIR, { recursive: true });
  });

  test('recompresses extracted files into a new 7z archive and verifies it matches the original', async () => {
    await sevenUnzip(ZIP_PATH, ZIP_TEMP_DIR);

    const paths = ['inner dir', 'test file 1.txt', 'test file 2.md'].map(file =>
      join(ZIP_TEMP_DIR, file)
    );

    const destination = join(ZIP_TEMP_DIR, 'test zip.7z');
    await sevenZip(paths, destination);

    const actual = readFileSync(destination);
    const expected = readFileSync(ZIP_PATH);
    expect(actual).toEqual(expected);
  });

  afterAll(() => {
    rimrafSync(ZIP_TEMP_DIR);
  });
});
