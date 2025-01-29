import { join } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { rimrafSync } from 'rimraf';

import * as utils from '../src/utils';
import { sevenZipSync } from '../src/sevenZipSync';
import { sevenUnzipSync } from '../src/sevenUnzipSync';

import {
  DATA_DIR,
  TEMP_DIR,
  TEST_FILES,
  TEST_PASSWORD,
  TEST_ZIP
} from './constants';

describe('Test sevenZipSync and sevenUnzipSync functions', () => {
  const tempDir = join(TEMP_DIR, 'sync_test');

  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  it('creates a valid 7-Zip archive', () => {
    const destination = join(tempDir, 'test zip.7z');

    sevenZipSync({ destination, files: TEST_FILES, level: 1 });

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });

  it('extracts files from a 7z archive', () => {
    const destination = join(tempDir, 'test zip password.7z');
    const password = TEST_PASSWORD;

    sevenZipSync({ destination, files: TEST_FILES, password });

    sevenUnzipSync({
      archive: destination,
      destination: tempDir,
      password
    });

    [
      'test file 1.txt',
      'test file 2.md',
      'inner dir/test file 3.txt',
      'inner dir/test file 4.md'
    ]
      .map(file => ({
        actual: join(tempDir, file),
        expected: join(DATA_DIR, file)
      }))
      .forEach(file => {
        expect(existsSync(file.actual)).toBeTruthy();

        const actual = readFileSync(file.actual);
        const expected = readFileSync(file.expected);
        expect(actual).toEqual(expected);
      });
  });

  it('throws an error if 7-Zip executable is not found', async () => {
    jest.spyOn(utils, 'getSevenZipPath').mockReturnValue(undefined);

    expect(() => sevenZipSync({ destination: '', files: [] })).toThrow(
      '7-Zip executable not found.'
    );

    expect(() => sevenUnzipSync({ archive: '', destination: '' })).toThrow(
      '7-Zip executable not found.'
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    rimrafSync(tempDir);
  });
});
