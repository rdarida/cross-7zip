import { join } from 'path';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { exec, which } from 'shelljs';

import { FILE_PATHS, TEMP_DIR } from './constants';

export default function globalSetup(): void {
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  const innerDir = join(TEMP_DIR, 'inner dir');
  mkdirSync(innerDir, { recursive: true });

  FILE_PATHS.forEach(path => {
    const content = `Hello, ${path.replace(TEMP_DIR, '')}` + EOL;
    writeFileSync(path, content);
  });

  if (which('7z')) {
    exec('7z a "test zip.7z"', { cwd: TEMP_DIR });
    exec('7z l "test zip.7z"', { cwd: TEMP_DIR });
  }
}
