import { join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { exec, which } from 'shelljs';

import { FILE_PATHS, TEMP_DIR } from './constants';
import { getSevenZipPath } from '../src/utils';

export default function globalSetup(): void {
  const innerDir = join(TEMP_DIR, 'inner dir');
  mkdirSync(innerDir, { recursive: true });

  FILE_PATHS.forEach(path => {
    const content = `Hello, ${path.replace(TEMP_DIR, '')}` + EOL;
    writeFileSync(path, content);
  });

  if (which('7z')) {
    exec('7z a -mx1 "test zip.7z"', { cwd: TEMP_DIR });
  } else {
    const seven = getSevenZipPath();
    exec(`${seven} a -mx1 "test zip.7z"`, { cwd: TEMP_DIR });
  }
}
