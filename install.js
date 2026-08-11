const { execSync } = require('node:child_process');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

(() => {
  const { platform } = process;

  if (platform === 'win32') {
    return;
  }

  const zipDir = join(__dirname, '7zip');

  const executables = readdirSync(zipDir)
    .filter(file => 0 === file.indexOf(platform))
    .map(file => join(zipDir, file));

  try {
    for (const executable of executables) {
      execSync(`chmod +x "${executable}"`);
    }
  } catch (error) {
    console.error(error);
  }
})();
