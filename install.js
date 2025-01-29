const { join } = require('path');
const { readdirSync } = require('fs');
const { execSync } = require('child_process');

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
