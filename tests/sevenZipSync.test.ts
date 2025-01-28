import { join } from 'path';
import { rimrafSync } from 'rimraf';
import { mkdirSync, readFileSync } from 'fs';

import * as utils from '../src/utils';
import { sevenZipSync } from '../src/sevenZipSync';

import { TEMP_DIR, TEST_FILES, TEST_ZIP } from './constants';

const ZIP_TEMP_DIR = join(TEMP_DIR, 'zipSync');

describe('Test sevenZipSync function', () => {
  beforeAll(() => {
    mkdirSync(ZIP_TEMP_DIR, { recursive: true });
  });

  xtest('creates a valid 7-Zip archive', () => {
    const destination = join(ZIP_TEMP_DIR, 'test zip.7z');

    sevenZipSync({ destination, files: TEST_FILES, level: 1 });

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });

  test('throws an error if 7-Zip executable is not found', () => {
    jest.spyOn(utils, 'getSevenZipPath').mockReturnValue(undefined);

    expect(() => sevenZipSync({ destination: '', files: [] })).toThrow(
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
