import { join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { EOL } from 'os';

import { getSevenZipPath } from '../src/utils';
import { DATA_DIR, FILE_PATHS } from './constants';

export default function globalSetup(): void {
  const innerDir = join(DATA_DIR, 'inner dir');
  mkdirSync(innerDir, { recursive: true });

  FILE_PATHS.forEach(path => {
    const content = `Hello, ${path.replace(DATA_DIR, '')}` + EOL;
    writeFileSync(path, content);
  });

  const seven = getSevenZipPath();
  execSync(`${seven} a -mx1 "../test zip.7z"`, { cwd: DATA_DIR });
}
