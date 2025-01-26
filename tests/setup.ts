import { join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { exec, which } from 'shelljs';

import { FILE_PATHS, SEVEN, TEMP_DIR } from './constants';

export default function globalSetup(): void {
  const innerDir = join(TEMP_DIR, 'inner dir');
  mkdirSync(innerDir, { recursive: true });

  FILE_PATHS.forEach(path => {
    const content = `Hello, ${path.replace(TEMP_DIR, '')}` + EOL;
    writeFileSync(path, content);
  });

  if (which(SEVEN)) {
    exec(`${SEVEN} a "test zip.7z"`, { cwd: TEMP_DIR });
    exec(`${SEVEN} l "test zip.7z"`, { cwd: TEMP_DIR });
  }
}
