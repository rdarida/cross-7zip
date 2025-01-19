import { join, resolve } from 'path';

const ZIP_DIR = resolve(__dirname, '..', '7zip');

const EXEC_MAP: Map<
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

/**
 * Resolves the path to the appropriate 7-Zip executable based on the given
 * platform and architecture.
 *
 * @param platform The platform for which the 7-Zip executable is required.
 * Defaults to the current platform (`process.platform`) if not provided.
 *
 * @param arch The architecture for which the 7-Zip executable is required.
 * Defaults to the current architecture (`process.arch`) if not provided.
 *
 * @returns The resolved path to the 7-Zip executable, or `undefined` if no
 * matching executable is found.
 */
export function getSevenZipPath(
  platform?: typeof process.platform,
  arch?: typeof process.arch
): string | undefined {
  platform = platform || process.platform;
  arch = arch || process.arch;

  return EXEC_MAP.get(`${platform}_${arch}`);
}
