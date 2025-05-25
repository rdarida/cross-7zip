import { ExecFileOptions, execFileSync } from 'child_process';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { rimrafSync } from 'rimraf';

import { getSevenZipPath } from '../src/utils';

import { PASSWORD_TEST_ZIP, TEMP_DIR } from './constants';

const SEVEN = getSevenZipPath() || '';

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
  const options: ExecFileOptions = {
    maxBuffer: Infinity,
    windowsHide: true,
    cwd: tempDir
  };

  beforeEach(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  // * 7z
  it('should print 7z help', () => {
    const ret = execFileSync(SEVEN, [], options).toString().trim();
    expect(ret.endsWith('-y : assume Yes on all queries')).toBe(true);
  });

  // ! 7z a
  it('should throw an error, because of missing zip parameters', () => {
    expect(() => execFileSync(SEVEN, ['a'], options)).toThrow(
      'Cannot find archive name'
    );
  });

  it('should throw an error, because of missing file', () => {
    const destination = join(tempDir, 'archive.7z');

    expect(() =>
      execFileSync(SEVEN, ['a', destination, 'no_file.txt'], options)
    ).toThrow('The system cannot find the file specified');
  });

  // ! 7z x
  it('should throw an error, because of missing unzip parameters', () => {
    expect(() => execFileSync(SEVEN, ['x'], options)).toThrow(
      'Cannot find archive name'
    );
  });

  it('should throw an error, because of missing archive', () => {
    expect(() => execFileSync(SEVEN, ['x', 'no_archive.7z'], options)).toThrow(
      'The system cannot find the file specified'
    );
  });

  it('should throw an error, because of missing password', () => {
    const archive = join(PASSWORD_TEST_ZIP);
    expect(() => execFileSync(SEVEN, ['x', archive], options)).toThrow(
      'Break signaled'
    );
  });

  it('should throw an error, because of wrong password', () => {
    const archive = join(PASSWORD_TEST_ZIP);

    expect(() =>
      execFileSync(SEVEN, ['x', archive, '-pwrongPassword'], options)
    ).toThrow('Cannot open encrypted archive. Wrong password?');
  });

  afterEach(() => {
    rimrafSync(tempDir);
  });
});
