import { join } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { rimrafSync } from 'rimraf';

import * as utils from '../src/utils';
import { SevenZip } from '../src/SevenZip';
import { sevenZip, sevenUnzip } from '../src/sevenZipUnzip';

import {
  OVERWRITE_TEST_ZIP,
  TEMP_DATA_DIR,
  TEMP_DIR,
  TEST_FILES,
  TEST_PASSWORD,
  TEST_ZIP
} from './constants';

describe('Test sevenZip and sevenUnzip functions', () => {
  const tempDir = join(TEMP_DIR, 'async_test');

  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  it('creates a valid 7-Zip archive', async () => {
    const destination = join(tempDir, 'test zip.7z');

    for (const testFile of TEST_FILES) {
      await sevenZip({ destination, files: [testFile], level: 1 });
    }

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });

  it('should overwrite the zip file on each addition', async () => {
    const destination = join(tempDir, 'overwrite test zip.7z');

    for (const testFile of TEST_FILES) {
      await sevenZip({
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

  it('extracts files from a 7z archive', async () => {
    const destination = join(tempDir, 'test zip password.7z');
    const password = TEST_PASSWORD;

    const sevenZip = new SevenZip()
      .setDestination(destination)
      .setFiles(TEST_FILES)
      .setLevel(5)
      .setPassword(password)
      .setOverwrite();

    await sevenZip.run();

    await sevenUnzip({
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
        expected: join(TEMP_DATA_DIR, file)
      }))
      .forEach(file => {
        expect(existsSync(file.actual)).toBeTruthy();

        const actual = readFileSync(file.actual);
        const expected = readFileSync(file.expected);
        expect(actual).toEqual(expected);
      });
  });

  it('should generate the correct 7-Zip command string', () => {
    const actual = new SevenZip()
      .setDestination('example.7z')
      .setFiles(['file 1.txt', 'file 2.md'])
      .setLevel(5)
      .setPassword('secure 123')
      .setOverwrite()
      .toString();

    const expected = [
      `"${utils.getSevenZipPath()}"`,
      '"a"',
      '"example.7z"',
      '"file 1.txt"',
      '"file 2.md"',
      '"-mx5"',
      '"-psecure 123"',
      '"-mhe=on"'
    ].join(' ');

    expect(actual).toBe(expected);
  });

  it('throws an error if 7-Zip executable is not found', async () => {
    jest.spyOn(utils, 'getSevenZipPath').mockReturnValue(undefined);

    await expect(sevenZip({ destination: '', files: [] })).rejects.toThrow(
      '7-Zip executable not found.'
    );

    await expect(sevenUnzip({ archive: '', destination: '' })).rejects.toThrow(
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
