import { join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { EOL } from 'os';

import { getSevenZipPath } from '../src/utils';
import { FILE_PATHS, TEMP_DIR } from './constants';

export default function globalSetup(): void {
  const innerDir = join(TEMP_DIR, 'inner dir');
  mkdirSync(innerDir, { recursive: true });

  FILE_PATHS.forEach(path => {
    const content = `Hello, ${path.replace(TEMP_DIR, '')}` + EOL;
    writeFileSync(path, content);
  });

  const seven = getSevenZipPath();
  execSync(`${seven} a -mx1 "test zip.7z"`, { cwd: TEMP_DIR });
}
