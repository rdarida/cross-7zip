import { ExecFileOptions, execFileSync } from 'child_process';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { rimrafSync } from 'rimraf';

import { TEMP_DIR } from './constants';

const OPTIONS: ExecFileOptions = {
  maxBuffer: Infinity,
  windowsHide: true
} as const;

describe('Test cli', () => {
  const tempDir = join(TEMP_DIR, 'cli_test');

  beforeEach(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  // ! seven
  it('should print help', () => {
    expect(() => execFileSync('node', ['dist/cli.js'], OPTIONS)).toThrow(
      'got 0, need at least 1'
    );
  });

  // ! seven zip
  it('should print zip help', () => {
    expect(() => execFileSync('node', ['dist/cli.js'], OPTIONS)).toThrow(
      'got 0, need at least 1'
    );
  });

  // ! seven unzip
  it('should print unzip help', () => {
    expect(() =>
      execFileSync('node', ['dist/cli.js', 'unzip'], OPTIONS)
    ).toThrow('got 0, need at least 1');
  });

  afterEach(() => {
    rimrafSync(tempDir);
  });
});
