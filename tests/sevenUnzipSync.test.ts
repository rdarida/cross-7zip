import { join } from 'path';
import { rimrafSync } from 'rimraf';
import { existsSync, mkdirSync } from 'fs';

import { UnzipOptions } from '../src/types';
import * as utils from '../src/utils';
import { sevenUnzipSync } from '../src/sevenUnzipSync';

import { TEMP_DIR, ZIP_PATH } from './constants';

const UNZIP_TEMP_DIR = join(TEMP_DIR, 'unzipSync');

describe('Test sevenUnzipSync function', () => {
  beforeAll(() => {
    mkdirSync(UNZIP_TEMP_DIR, { recursive: true });
  });

  test('extracts files from a 7z archive and verifies their existence', () => {
    const options: UnzipOptions = {
      archive: ZIP_PATH,
      destination: UNZIP_TEMP_DIR
    };

    sevenUnzipSync(options);

    [
      'test file 1.txt',
      'test file 2.md',
      'inner dir/test file 3.txt',
      'inner dir/test file 4.md'
    ]
      .map(file => join(UNZIP_TEMP_DIR, file))
      .forEach(path => {
        expect(existsSync(path)).toBeTruthy();
      });
  });

  test('throws an error if 7-Zip executable is not found', () => {
    jest.spyOn(utils, 'getSevenZipPath').mockReturnValue(undefined);

    const options: UnzipOptions = {
      archive: ZIP_PATH,
      destination: UNZIP_TEMP_DIR
    };

    expect(() => sevenUnzipSync(options)).toThrow(
      '7-Zip executable not found.'
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    rimrafSync(UNZIP_TEMP_DIR);
  });
});
