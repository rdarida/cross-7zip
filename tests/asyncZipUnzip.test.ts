import { join } from 'path';
import { mkdirSync, readFileSync } from 'fs';

import { sevenZip } from '../src/sevenZip';

import { TEMP_DIR, TEST_FILES, TEST_ZIP } from './constants';

describe('Test sevenZip and sevenUnzip functions', () => {
  const tempDir = join(TEMP_DIR, 'async_test');
  const destination = join(tempDir, 'test zip.7z');

  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  it('creates a valid 7-Zip archive', async () => {
    await sevenZip({ destination, files: TEST_FILES, level: 1 });

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });
});
