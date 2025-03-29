import { join } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { rimrafSync } from 'rimraf';

import { executeSync } from '../src/utils';

import { TEMP_DIR, TEST_FILES, TEST_ZIP } from './constants';

describe('Test cli', () => {
  const tempDir = join(TEMP_DIR, 'cli_test');

  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  it('should extract the contents of a ZIP file', () => {
    executeSync('node', ['dist/cli.js', 'unzip', TEST_ZIP, tempDir]);

    const files = ['inner dir', 'test file 1.txt', 'test file 2.md'].map(file =>
      join(tempDir, file)
    );

    files.forEach(path => expect(existsSync(path)).toBeTruthy());
  });

  it('should create a ZIP file', () => {
    const destination = join(tempDir, 'test zip.7z');

    for (const testFile of TEST_FILES) {
      executeSync('node', [
        'dist/cli.js',
        'zip',
        destination,
        testFile,
        '--level=1'
      ]);
    }

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });

  afterAll(() => {
    rimrafSync(tempDir);
  });
});
