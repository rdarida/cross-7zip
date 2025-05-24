import { ExecFileOptions, execFileSync } from 'child_process';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { rimrafSync } from 'rimraf';

import { getSevenZipPath } from '../src/utils';

import { PASSWORD_TEST_ZIP, TEMP_DIR } from './constants';

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
describe('Test 7z executable', () => {
  const seven = getSevenZipPath();
  const tempDir = join(TEMP_DIR, '7z_test');
  const options: ExecFileOptions = {
    maxBuffer: Infinity,
    windowsHide: true,
    cwd: tempDir
  };

  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  it('should print 7z help', () => {
    if (!seven) return;

    const ret = execFileSync(seven, [], options).toString().trim();
    expect(ret.endsWith('-y : assume Yes on all queries')).toBe(true);
  });

  // Zip tests
  it('should throw an error, because of missing zip parameters', () => {
    if (!seven) return;

    expect(() => execFileSync(seven, ['a'], options)).toThrow();
  });

  it('should throw an error, because of missing file', () => {
    if (!seven) return;

    const destination = join(tempDir, 'archive.7z');

    expect(() =>
      execFileSync(seven, ['a', destination, 'no_file.txt'], options)
    ).toThrow();
  });

  // Unzip tests
  it('should throw an error, because of missing unzip parameters', () => {
    if (!seven) return;

    expect(() => execFileSync(seven, ['x'], options)).toThrow();
  });

  it('should throw an error, because of missing archive', () => {
    if (!seven) return;

    expect(() =>
      execFileSync(seven, ['x', 'no_archive.7z'], options)
    ).toThrow();
  });

  it('should throw an error, because of missing password', () => {
    if (!seven) return;

    const archive = join(PASSWORD_TEST_ZIP);
    expect(() => execFileSync(seven, ['x', archive], options)).toThrow();
  });

  it('should throw an error, because of wrong password', () => {
    if (!seven) return;

    const archive = join(PASSWORD_TEST_ZIP);

    expect(() =>
      execFileSync(seven, ['x', archive, '-pwrongPassword'], options)
    ).toThrow();
  });

  afterAll(() => {
    rimrafSync(tempDir);
  });
});
