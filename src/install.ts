import { execSync } from 'child_process';

import { getSevenZipPath } from './utils';

(() => {
  const seven = getSevenZipPath();

  if (seven && process.platform !== 'win32') {
    try {
      execSync(`chmod +x "${seven}"`);
    } catch (error) {
      console.log(error);
    }
  }
})();
