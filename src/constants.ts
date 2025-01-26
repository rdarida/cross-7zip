import { join } from 'path';

const ZIP_DIR = join(__dirname, '..', '7zip');

export const EXEC_MAP: Map<
  `${typeof process.platform}_${typeof process.arch}`,
  string
> = new Map();

EXEC_MAP.set('linux_arm', join(ZIP_DIR, 'linux_arm_7z'));
EXEC_MAP.set('linux_arm64', join(ZIP_DIR, 'linux_arm64_7z'));
EXEC_MAP.set('linux_ia32', join(ZIP_DIR, 'linux_ia32_7z'));
EXEC_MAP.set('linux_x64', join(ZIP_DIR, 'linux_x64_7z'));

EXEC_MAP.set('win32_arm64', join(ZIP_DIR, 'win32_arm64_7z.exe'));
EXEC_MAP.set('win32_ia32', join(ZIP_DIR, 'win32_ia32_7z.exe'));
EXEC_MAP.set('win32_x64', join(ZIP_DIR, 'win32_x64_7z.exe'));

EXEC_MAP.set('darwin_arm64', join(ZIP_DIR, 'darwin_7z'));
EXEC_MAP.set('darwin_ia32', join(ZIP_DIR, 'darwin_7z'));
EXEC_MAP.set('darwin_x64', join(ZIP_DIR, 'darwin_7z'));
