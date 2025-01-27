import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { rimrafSync } from 'rimraf';
import { execSync } from 'child_process';
import { EOL } from 'os';

import { getSevenZipPath } from '../src/utils';
import { DATA_DIR, FILE_PATHS, TEMP_DIR } from './constants';

export default function globalSetup(): void {
  if (existsSync(TEMP_DIR)) {
    rimrafSync(TEMP_DIR);
  }

  const innerDir = join(DATA_DIR, 'inner dir');
  mkdirSync(innerDir, { recursive: true });

  FILE_PATHS.forEach(path => {
    const content = `Hello, ${path.replace(DATA_DIR, '')}` + EOL;
    writeFileSync(path, content);
  });

  const seven = getSevenZipPath();
  execSync(`${seven} a -mx1 "../test zip.7z"`, { cwd: DATA_DIR });
}
