import { join } from 'path';
import { rimrafSync } from 'rimraf';
import { existsSync, mkdirSync, readFileSync } from 'fs';

import { executeSync } from '../src/utils';

import { TEST_ZIP } from './constants';

const CLI_TEMP_DIR = join(__dirname, '.temp', 'cli');

describe('Test cli', () => {
  beforeAll(() => {
    mkdirSync(CLI_TEMP_DIR, { recursive: true });
  });

  test('unzips and recompresses files using CLI commands', () => {
    executeSync('node', ['dist/cli.js', 'unzip', TEST_ZIP, CLI_TEMP_DIR]);

    const destination = join(CLI_TEMP_DIR, 'test zip.7z');

    const files = ['inner dir', 'test file 1.txt', 'test file 2.md'].map(file =>
      join(CLI_TEMP_DIR, file)
    );

    files.forEach(path => expect(existsSync(path)).toBeTruthy());

    executeSync('node', [
      'dist/cli.js',
      'zip',
      destination,
      ...files,
      '--level=1'
    ]);

    const actual = readFileSync(destination);
    const expected = readFileSync(TEST_ZIP);
    expect(actual).toEqual(expected);
  });

  afterAll(() => {
    rimrafSync(CLI_TEMP_DIR);
  });
});
