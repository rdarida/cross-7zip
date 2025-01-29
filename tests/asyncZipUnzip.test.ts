import { join } from 'path';
import { mkdirSync, readFileSync } from 'fs';

import { sevenZip } from '../src/sevenZip';

import { TEMP_DIR, TEST_FILES, TEST_ZIP } from './constants';

describe('', () => {
  const tempDir = join(TEMP_DIR, 'async_test');
  const destination = join(tempDir, 'test zip.7z');

  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  it('', async () => {
    await sevenZip({ destination, files: TEST_FILES });

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });
});
