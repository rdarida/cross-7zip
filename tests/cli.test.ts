import { ExecFileOptions, execFileSync } from 'child_process';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { rimrafSync } from 'rimraf';

import {
  PASSWORD_TEST_ZIP,
  TEMP_DATA_DIR,
  TEMP_DIR,
  TEST_ZIP
} from './constants';

const SEVEN = join(__dirname, '..', 'dist', 'cli.js');

const OPTIONS: ExecFileOptions = {
  maxBuffer: Infinity,
  windowsHide: true,
  cwd: TEMP_DATA_DIR
} as const;

describe('Test cli', () => {
  const tempDir = join(TEMP_DIR, 'cli_test');
  const zipDest = join(tempDir, 'archive.7z');
  const unzipDest = join(tempDir, 'folder');

  beforeEach(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  // ! seven
  it('should print help', () => {
    expect(() => execFileSync('node', [SEVEN], OPTIONS)).toThrow(
      'got 0, need at least 1'
    );
  });

  // ! seven zip
  it('should print zip help', () => {
    expect(() => execFileSync('node', [SEVEN, 'zip'], OPTIONS)).toThrow(
      'got 0, need at least 1'
    );
  });

  // * seven zip <tempDir>/archive.7z [cwd]
  it('should create an archive from cwd', () => {
    execFileSync('node', [SEVEN, 'zip', zipDest], OPTIONS);
    expect(existsSync(zipDest)).toBe(true);
  });

  // ! seven zip <tempDir>/archive.7z <cwd>/no_file.txt
  it('should throw an error, because of missing file', () => {
    const errorMessage =
      process.platform === 'win32'
        ? 'The system cannot find the file specified'
        : 'No such file or directory';

    expect(() =>
      execFileSync('node', [SEVEN, 'zip', zipDest, 'no_file.txt'], OPTIONS)
    ).toThrow(errorMessage);
  });

  // ! seven unzip
  it('should print unzip help', () => {
    expect(() => execFileSync('node', [SEVEN, 'unzip'], OPTIONS)).toThrow(
      'got 0, need at least 1'
    );
  });

  // ! seven unzip <cwd>/no_archive.7z [cwd]
  it('should throw an error, because of missing archive', () => {
    const errorMessage =
      process.platform === 'win32'
        ? 'The system cannot find the file specified'
        : 'No such file or directory';

    expect(() =>
      execFileSync('node', [SEVEN, 'unzip', 'no_archive.7z'], OPTIONS)
    ).toThrow(errorMessage);
  });

  // ! seven unzip <cwd>/not_an_archive [cwd]
  it('should throw an error, because the input is not an archive', () => {
    expect(() =>
      execFileSync('node', [SEVEN, 'unzip', 'test file 1.txt'], OPTIONS)
    ).toThrow('Cannot open the file as archive');
  });

  // * seven unzip <TEMP_DIR>/test zip.7z [cwd]
  it('should extract archive to cwd', () => {
    execFileSync('node', [SEVEN, 'unzip', TEST_ZIP], {
      ...OPTIONS,
      cwd: tempDir
    });

    expect(existsSync(join(tempDir, 'inner dir'))).toBe(true);
  });

  // * seven unzip <TEMP_DIR>/test zip.7z <tempDir>/folder
  it('should extract archive to folder', () => {
    execFileSync('node', [SEVEN, 'unzip', TEST_ZIP, unzipDest], OPTIONS);
    expect(existsSync(unzipDest)).toBe(true);
  });

  // ! seven unzip <PASSWORD_TEST_ZIP> [cwd] -p
  it('should throw an error, because of missing password', () => {
    expect(() =>
      execFileSync('node', [SEVEN, 'unzip', PASSWORD_TEST_ZIP], OPTIONS)
    ).toThrow('Break signaled');
  });

  // ! seven unzip <PASSWORD_TEST_ZIP> [cwd] -p=wrongPasswrod
  it('should throw an error, because of wrong password', () => {
    expect(() =>
      execFileSync(
        'node',
        [SEVEN, 'unzip', PASSWORD_TEST_ZIP, '-p=wrongPassword'],
        OPTIONS
      )
    ).toThrow('Cannot open encrypted archive. Wrong password?');
  });

  // * seven unzip <PASSWORD_TEST_ZIP> [cwd] -p=secure 123
  it('should extract password protected archive to cwd', () => {
    execFileSync('node', [SEVEN, 'unzip', PASSWORD_TEST_ZIP, '-p=secure 123'], {
      ...OPTIONS,
      cwd: tempDir
    });

    expect(existsSync(join(tempDir, 'inner dir'))).toBe(true);
  });

  afterEach(() => {
    rimrafSync(tempDir);
  });
});
