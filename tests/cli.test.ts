import { join, resolve } from 'path';
import { rimrafSync } from 'rimraf';
import { existsSync, mkdirSync, readFileSync } from 'fs';

import { executeSync } from '../src/utils';

const CLI_TEMP_DIR = resolve(__dirname, '.temp', 'cli');

describe('Test cli', () => {
  beforeAll(() => {
    mkdirSync(CLI_TEMP_DIR, { recursive: true });
  });

  test('unzips and recompresses files using CLI commands', () => {
    const archive = resolve('tests', 'data', `test ${process.platform}.7z`);
    executeSync('node', ['dist/cli.js', 'unzip', archive, CLI_TEMP_DIR]);

    const paths = ['inner folder', 'test 1.txt', 'test 2.txt'].map(file =>
      join(CLI_TEMP_DIR, file)
    );

    paths.forEach(path => expect(existsSync(path)).toBeTruthy());

    const destination = join(CLI_TEMP_DIR, `test ${process.platform}.7z`);
    executeSync('node', ['dist/cli.js', 'zip', destination, ...paths]);

    const actual = readFileSync(destination);
    const expected = readFileSync(archive);
    expect(actual).toEqual(expected);
  });

  afterAll(() => {
    rimrafSync(CLI_TEMP_DIR);
  });
});
