import { UnzipOptions } from './types';
import { executeSync, getSevenZipPath } from './utils';

/**
 * Extracts files from a specified zipped file **synchronously**.
 *
 * @param options An object containing options for the extraction process.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * ```
 * import { sevenUnzipSync } from 'cross-7zip';
 *
 * function extractFiles() {
 *   try {
 *     const unzipOptions: UnzipOptions = {
 *       archive: 'example.7z',
 *       destination: './output'
 *     };
 *
 *     sevenUnzipSync(unzipOptions);
 *     console.log('Extraction completed successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during extraction:', error);
 *   }
 * }
 * ```
 *
 * For additional examples, see the
 * [test file](https://github.com/rdarida/cross-7zip/blob/main/tests/syncZipUnzipSync.test.ts).
 */
export function sevenUnzipSync(options: UnzipOptions): void {
  const command = getSevenZipPath();

  if (!command) {
    throw new Error('7-Zip executable not found.');
  }

  const { archive, destination, password } = options;
  const args = ['x', archive, `-o${destination}`];

  if (password) {
    args.push(`-p${password}`);
  }

  executeSync(command, args);
}
