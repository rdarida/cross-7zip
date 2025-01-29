import { join } from 'path';
import { mkdirSync, readFileSync } from 'fs';

import { sevenZip } from '../src/sevenZip';

import { TEMP_DIR, TEST_FILES, TEST_ZIP } from './constants';

const ASYNC_DIR = join(TEMP_DIR, 'async_test');

describe('', () => {
  beforeAll(() => {
    mkdirSync(ASYNC_DIR, { recursive: true });
  });

  it('', async () => {
    const destination = join(ASYNC_DIR, 'test zip.7z');

    await sevenZip({ destination, files: TEST_FILES });

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });
});
