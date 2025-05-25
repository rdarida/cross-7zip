import { ExecFileOptions, execFileSync } from 'child_process';
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

const OPTIONS: ExecFileOptions = {
  maxBuffer: Infinity,
  windowsHide: true,
  cwd: TEMP_DATA_DIR
} as const;

/**
 * * 7z
 *
 * ! 7z a
 * * 7z a archive.7z
 * * 7z a folder/archive.7z
 * * 7z a no_folder/archive.7z
 * ! 7z a no_folder/archive.7z no_file.txt
 * ! 7z a no_folder/archive.7z no_file.txt file.md
 * * 7z a no_folder/archive.7z folder file.txt file.md -ppassword
 *
 * ! 7z x
 * ! 7z x no_archive.7z
 * * 7z x archive.7z
 * * 7z x archive.7z -ofolder
 * ! 7z x archive.7z -ofolder -p
 * ! 7z x archive.7z -ofolder -pwrongpassword
 * * 7z x archive.7z -ofolder -ppassword
 */
(SEVEN ? describe : xdescribe)('Test 7z executable', () => {
  const tempDir = join(TEMP_DIR, '7z_test');
  const zipDest = join(tempDir, 'archive.7z');

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
    expect(() =>
      execFileSync(SEVEN, ['a', zipDest, 'no_file.txt'], OPTIONS)
    ).toThrow('The system cannot find the file specified');
  });

  // ! 7z x
  it('should throw an error, because of missing unzip parameters', () => {
    expect(() => execFileSync(SEVEN, ['x'], OPTIONS)).toThrow(
      'Cannot find archive name'
    );
  });

  // ! 7z x <cwd>/no_archive.7z [cwd]
  it('should throw an error, because of missing archive', () => {
    expect(() => execFileSync(SEVEN, ['x', 'no_archive.7z'], OPTIONS)).toThrow(
      'The system cannot find the file specified'
    );
  });

  // * 7z x <TEMP_DIR>/test zip.7z [cwd]
  it('should extract archive to cwd', () => {
    execFileSync(SEVEN, ['x', TEST_ZIP], { ...OPTIONS, cwd: tempDir });
    expect(existsSync(join(tempDir, 'inner dir'))).toBe(true);
  });

  it('should throw an error, because of missing password', () => {
    const archive = join(PASSWORD_TEST_ZIP);
    expect(() => execFileSync(SEVEN, ['x', archive], OPTIONS)).toThrow(
      'Break signaled'
    );
  });

  it('should throw an error, because of wrong password', () => {
    const archive = join(PASSWORD_TEST_ZIP);

    expect(() =>
      execFileSync(SEVEN, ['x', archive, '-pwrongPassword'], OPTIONS)
    ).toThrow('Cannot open encrypted archive. Wrong password?');
  });

  afterEach(() => {
    // rimrafSync(tempDir);
  });
});
