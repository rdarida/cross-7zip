import {
  execFileSync,
  ExecFileSyncOptionsWithBufferEncoding
} from 'child_process';

import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { rimrafSync } from 'rimraf';

import { getSevenZipPath } from '../src/utils';

import {
  PASSWORD_TEST_ZIP,
  TEMP_DATA_DIR,
  TEMP_DIR,
  TEST_ZIP
} from './constants';

const SEVEN = getSevenZipPath() || '';

const OPTIONS: ExecFileSyncOptionsWithBufferEncoding = {
  maxBuffer: Infinity,
  windowsHide: true,
  cwd: TEMP_DATA_DIR
} as const;

(SEVEN ? describe : xdescribe)('Test 7z executable', () => {
  const tempDir = join(TEMP_DIR, '7z_test');
  const zipDest = join(tempDir, 'archive.7z');
  const unzipDest = join(tempDir, 'folder');

  beforeEach(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  // * 7z
  it('should print 7z help', () => {
    const ret = execFileSync(SEVEN, [], OPTIONS).toString().trim();
    expect(ret.endsWith('-y : assume Yes on all queries')).toBe(true);
  });

  // ! 7z a
  it('should throw an error, because of missing zip parameters', () => {
    expect(() => execFileSync(SEVEN, ['a'], OPTIONS)).toThrow(
      'Cannot find archive name'
    );
  });

  // * 7z a <tempDir>/archive.7z [cwd]
  it('should create an archive from cwd', () => {
    execFileSync(SEVEN, ['a', zipDest], OPTIONS);
    expect(existsSync(zipDest)).toBe(true);
  });

  // ! 7z a <tempDir>/archive.7z <cwd>/no_file.txt
  it('should throw an error, because of missing file', () => {
    const errorMessage =
      process.platform === 'win32'
        ? 'The system cannot find the file specified'
        : 'No such file or directory';

    expect(() =>
      execFileSync(SEVEN, ['a', zipDest, 'no_file.txt'], OPTIONS)
    ).toThrow(errorMessage);
  });

  // ! 7z x
  it('should throw an error, because of missing unzip parameters', () => {
    expect(() => execFileSync(SEVEN, ['x'], OPTIONS)).toThrow(
      'Cannot find archive name'
    );
  });

  // ! 7z x <cwd>/no_archive.7z [cwd]
  it('should throw an error, because of missing archive', () => {
    const errorMessage =
      process.platform === 'win32'
        ? 'The system cannot find the file specified'
        : 'No such file or directory';

    expect(() => execFileSync(SEVEN, ['x', 'no_archive.7z'], OPTIONS)).toThrow(
      errorMessage
    );
  });

  // ! 7z x <cwd>/not_an_archive [cwd]
  it('should throw an error, because the input is not an archive', () => {
    expect(() =>
      execFileSync(SEVEN, ['x', 'test file 1.txt'], OPTIONS)
    ).toThrow('Cannot open the file as archive');
  });

  // * 7z x <TEMP_DIR>/test zip.7z [cwd]
  it('should extract archive to cwd', () => {
    execFileSync(SEVEN, ['x', TEST_ZIP], { ...OPTIONS, cwd: tempDir });
    expect(existsSync(join(tempDir, 'inner dir'))).toBe(true);
  });

  // * 7z x <TEMP_DIR>/test zip.7z -o<tempDir>/folder
  it('should extract archive to folder', () => {
    execFileSync(SEVEN, ['x', TEST_ZIP, `-o${unzipDest}`], OPTIONS);
    expect(existsSync(unzipDest)).toBe(true);
  });

  // ! 7z x <PASSWORD_TEST_ZIP> [cwd] -p
  it('should throw an error, because of missing password', () => {
    expect(() =>
      execFileSync(SEVEN, ['x', PASSWORD_TEST_ZIP], OPTIONS)
    ).toThrow('Break signaled');
  });

  // ! 7z x <PASSWORD_TEST_ZIP> [cwd] -pwrongPasswrod
  it('should throw an error, because of wrong password', () => {
    expect(() =>
      execFileSync(SEVEN, ['x', PASSWORD_TEST_ZIP, '-pwrongPassword'], OPTIONS)
    ).toThrow('Cannot open encrypted archive. Wrong password?');
  });

  // * 7z x <PASSWORD_TEST_ZIP> [cwd] -p"secure 123"
  it('should extract password protected archive to cwd', () => {
    execFileSync(SEVEN, ['x', PASSWORD_TEST_ZIP, '-psecure 123'], {
      ...OPTIONS,
      cwd: tempDir
    });

    expect(existsSync(join(tempDir, 'inner dir'))).toBe(true);
  });

  afterEach(() => {
    rimrafSync(tempDir);
  });
});
