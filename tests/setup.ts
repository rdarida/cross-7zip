import { cpSync, existsSync, mkdirSync } from 'fs';
import { rimrafSync } from 'rimraf';
import { execSync } from 'child_process';

import { getSevenZipPath } from '../src/utils';

import {
  DATA_DIR,
  OVERWRITE_TEST_ZIP,
  PASSWORD_TEST_ZIP,
  TEMP_DATA_DIR,
  TEMP_DIR,
  TEST_FILES,
  TEST_PASSWORD,
  TEST_ZIP
} from './constants';

export default function globalSetup(): void {
  const seven = getSevenZipPath();

  if (!seven) return;

  if (existsSync(TEMP_DIR)) {
    rimrafSync(TEMP_DIR);
  }

  mkdirSync(TEMP_DATA_DIR, { recursive: true });
  cpSync(DATA_DIR, TEMP_DATA_DIR, { recursive: true });

  TEST_FILES.forEach(testFile => {
    execSync(`${seven} a -mx1 "${TEST_ZIP}" "${testFile}"`, {
      cwd: TEMP_DIR
    });
  });

  const lastFile = TEST_FILES[TEST_FILES.length - 1];

  execSync(`${seven} a -mx1 "${OVERWRITE_TEST_ZIP}" "${lastFile}"`, {
    cwd: TEMP_DIR
  });

  execSync(
    `${seven} a -mx1 -p"${TEST_PASSWORD}" -mhe=on "${PASSWORD_TEST_ZIP}"`,
    {
      cwd: DATA_DIR
    }
  );
}
