import { ExecFileOptions, execFileSync } from 'child_process';
import { join } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { rimrafSync } from 'rimraf';

import { TEMP_DIR, TEST_FILES, TEST_ZIP } from './constants';
import { getSevenZipPath } from '../src/utils';

const OPTIONS: ExecFileOptions = {
  maxBuffer: Infinity,
  windowsHide: true
};

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
 * ! 7z x archive.7z -ofolder -pwrongpassword
 * * 7z x archive.7z -ofolder -ppassword
 */
describe('Test 7z executable', () => {
  const seven = getSevenZipPath();
  const tempDir = join(TEMP_DIR, '7z_test');

  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  it('should print 7z help', () => {
    if (!seven) return;

    const ret = execFileSync(seven, [], OPTIONS).toString().trim();
    expect(ret.endsWith('-y : assume Yes on all queries')).toBe(true);
  });

  afterAll(() => {
    rimrafSync(tempDir);
  });
});
