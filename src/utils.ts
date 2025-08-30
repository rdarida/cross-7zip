import {
  ExecFileOptions,
  ExecFileSyncOptionsWithBufferEncoding,
  execFile,
  execFileSync
} from 'child_process';

import { EXEC_MAP } from './constants';

const OPTIONS: ExecFileOptions = {
  maxBuffer: Infinity,
  windowsHide: true
};

export async function execute(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    execFile(command, args, OPTIONS, error => {
      if (error) {
        return reject(new Error(error.message));
      }

      resolve();
    });
  });
}

export function executeSync(command: string, args: string[]): void {
  execFileSync(command, args, OPTIONS as ExecFileSyncOptionsWithBufferEncoding);
}

/**
 * Resolves the path to the appropriate 7-Zip executable based on the given
 * platform and architecture.

 * @returns The resolved path to the 7-Zip executable, or `undefined` if no
 * matching executable is found.
 */
export function getSevenZipPath(): string | undefined {
  const { platform, arch } = process;

  return EXEC_MAP.get(`${platform}_${arch}`);
}
