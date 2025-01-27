import { join } from 'path';
import { rimrafSync } from 'rimraf';
import { mkdirSync, readFileSync } from 'fs';

import { UnzipOptions } from '../src/types';
import * as utils from '../src/utils';
import { sevenUnzipSync } from '../src/sevenUnzipSync';
import { sevenZipSync } from '../src/sevenZipSync';

import { TEMP_DIR, ZIP_PATH } from './constants';

const ZIP_TEMP_DIR = join(TEMP_DIR, 'zipSync');

describe('Test sevenZipSync function', () => {
  beforeAll(() => {
    mkdirSync(ZIP_TEMP_DIR, { recursive: true });
  });

  test('recompresses extracted files into a new 7z archive and verifies it matches the original', () => {
    const unzipOptions: UnzipOptions = {
      archive: ZIP_PATH,
      destination: ZIP_TEMP_DIR
    };

    sevenUnzipSync(unzipOptions);

    const paths = ['inner dir', 'test file 1.txt', 'test file 2.md'].map(file =>
      join(ZIP_TEMP_DIR, file)
    );

    const destination = join(ZIP_TEMP_DIR, 'test zip.7z');
    sevenZipSync(paths, destination);

    const actual = readFileSync(destination);
    const expected = readFileSync(ZIP_PATH);
    expect(actual).toEqual(expected);
  });

  test('throws an error if 7-Zip executable is not found', () => {
    jest.spyOn(utils, 'getSevenZipPath').mockReturnValue(undefined);

    const paths = ['inner dir', 'test file 1.txt', 'test file 2.md'].map(file =>
      join(ZIP_TEMP_DIR, file)
    );

    const destination = join(ZIP_TEMP_DIR, 'test zip.7z');

    expect(() => sevenZipSync(paths, destination)).toThrow(
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
