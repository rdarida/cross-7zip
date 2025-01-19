import { ExecFileOptions, execFile, execFileSync } from 'child_process';

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
  execFileSync(command, args, OPTIONS);
}
