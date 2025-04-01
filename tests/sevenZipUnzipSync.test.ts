import { join } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { rimrafSync } from 'rimraf';

import * as utils from '../src/utils';
import { SevenUnzip } from '../src/SevenUnzip';
import { sevenZipSync, sevenUnzipSync } from '../src/sevenZipUnzipSync';

import {
  DATA_DIR,
  OVERWRITE_TEST_ZIP,
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

    for (const testFile of TEST_FILES) {
      sevenZipSync({ destination, files: [testFile], level: 1 });
    }

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });

  it('should overwrite the zip file on each addition', () => {
    const destination = join(tempDir, 'overwrite test zip.7z');

    for (const testFile of TEST_FILES) {
      sevenZipSync({
        destination,
        files: [testFile],
        level: 1,
        overwrite: true
      });
    }

    const actual = readFileSync(destination);
    const expected = readFileSync(OVERWRITE_TEST_ZIP);
    expect(actual).toEqual(expected);
  });

  it('extracts files from a 7z archive', () => {
    const destination = join(tempDir, 'test zip password.7z');
    const password = TEST_PASSWORD;

    sevenZipSync({ destination, files: TEST_FILES, password });

    const sevenUnzip = new SevenUnzip()
      .setArchive(destination)
      .setDestination(tempDir)
      .setPassword(password);

    sevenUnzip.runSync();

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

  it('should generate the correct 7-Zip command string', () => {
    const actual = new SevenUnzip()
      .setArchive('example.7z')
      .setDestination('outputFolder')
      .setPassword('secure 123')
      .toString();

    const expected = [
      `"${utils.getSevenZipPath()}"`,
      '"x"',
      '"example.7z"',
      '"-ooutputFolder"',
      '"-psecure 123"'
    ].join(' ');

    expect(actual).toBe(expected);
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
