import { join } from 'path';
import { rimrafSync } from 'rimraf';
import { mkdirSync, readFileSync } from 'fs';

import * as utils from '../src/utils';
import { sevenZip } from '../src/sevenZip';

import { TEMP_DIR, TEST_FILES, TEST_ZIP } from './constants';

const ZIP_TEMP_DIR = join(TEMP_DIR, 'zip');

describe('Test sevenZip function', () => {
  beforeAll(() => {
    mkdirSync(ZIP_TEMP_DIR, { recursive: true });
  });

  test('creates a valid 7-Zip archive', async () => {
    const destination = join(ZIP_TEMP_DIR, 'test zip.7z');

    await sevenZip({ destination, files: TEST_FILES });

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });

  test('throws an error if 7-Zip executable is not found', async () => {
    jest.spyOn(utils, 'getSevenZipPath').mockReturnValue(undefined);

    await expect(sevenZip({ destination: '', files: [] })).rejects.toThrow(
      '7-Zip executable not found.'
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    rimrafSync(ZIP_TEMP_DIR);
  });
});
