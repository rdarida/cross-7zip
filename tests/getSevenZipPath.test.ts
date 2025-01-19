import { getSevenZipPath } from '../src/getSevenZipPath';

describe('Test getSevenZipPath function', () => {
  test('resolves correct 7-Zip executable path based on platform and architecture', () => {
    const actual = getSevenZipPath();

    if (process.platform === 'win32') {
      expect(actual?.endsWith('win32_x64_7z.exe')).toBeTruthy();
    } else if (process.platform === 'linux') {
      expect(actual?.endsWith('linux_x64_7z')).toBeTruthy();
    } else if (process.platform === 'darwin') {
      expect(actual?.endsWith('darwin_7z')).toBeTruthy();
    } else {
      fail();
    }
  });

  test('resolves the correct 7-Zip executable path for Windows architectures', () => {
    let actual = getSevenZipPath('win32', 'arm');
    expect(actual).toBeUndefined();

    actual = getSevenZipPath('win32', 'arm64');
    expect(actual?.endsWith('win32_arm64_7z.exe')).toBeTruthy();

    actual = getSevenZipPath('win32', 'ia32');
    expect(actual?.endsWith('win32_ia32_7z.exe')).toBeTruthy();

    actual = getSevenZipPath('win32', 'x64');
    expect(actual?.endsWith('win32_x64_7z.exe')).toBeTruthy();
  });

  test('resolves the correct 7-Zip executable path for Linux architectures', () => {
    let actual = getSevenZipPath('linux', 'arm');
    expect(actual?.endsWith('linux_arm_7z')).toBeTruthy();

    actual = getSevenZipPath('linux', 'arm64');
    expect(actual?.endsWith('linux_arm64_7z')).toBeTruthy();

    actual = getSevenZipPath('linux', 'ia32');
    expect(actual?.endsWith('linux_ia32_7z')).toBeTruthy();

    actual = getSevenZipPath('linux', 'x64');
    expect(actual?.endsWith('linux_x64_7z')).toBeTruthy();
  });

  test('resolves the correct 7-Zip executable path for macOS architectures', () => {
    let actual = getSevenZipPath('darwin', 'arm');
    expect(actual).toBeUndefined();

    actual = getSevenZipPath('darwin', 'arm64');
    expect(actual?.endsWith('darwin_7z')).toBeTruthy();

    actual = getSevenZipPath('darwin', 'ia32');
    expect(actual?.endsWith('darwin_7z')).toBeTruthy();

    actual = getSevenZipPath('darwin', 'x64');
    expect(actual?.endsWith('darwin_7z')).toBeTruthy();
  });
});
