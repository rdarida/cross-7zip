import { existsSync, mkdirSync } from 'fs';
import { rimrafSync } from 'rimraf';
import { execSync } from 'child_process';

import { getSevenZipPath } from '../src/utils';

import { DATA_DIR, TEMP_DIR, TEST_FILES, TEST_ZIP } from './constants';

export default function globalSetup(): void {
  if (existsSync(TEMP_DIR)) {
    rimrafSync(TEMP_DIR);
  }

  mkdirSync(TEMP_DIR, { recursive: true });

  TEST_FILES.forEach(testFile => {
    execSync(`${getSevenZipPath()} a -mx1 "${TEST_ZIP}" "${testFile}"`, {
      cwd: TEMP_DIR
    });
  });
}
