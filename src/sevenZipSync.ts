import { ZipOptions } from './types';
import { executeSync, getSevenZipPath } from './utils';

/**
 * Compresses multiple files into a zipped file **synchronously**.
 *
 * @param options An object containing options for the compression process.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * import { ZipOptions, sevenZipSync } from 'cross-7zip';
 *
 * function createArchive() {
 *   try {
 *     const zipOptions: ZipOptions = {
 *       destination: 'example.7z',
 *       paths: ['document.txt', 'image.png', 'folder']
 *     };
 *
 *     sevenZipSync(zipOptions);
 *     console.log('Archive created successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during compression:', error);
 *   }
 * }
 */
export function sevenZipSync(options: ZipOptions): void {
  const command = getSevenZipPath();

  if (!command) {
    throw new Error('7-Zip executable not found.');
  }

  const { destination, paths } = options;
  const args = ['a', destination, ...paths];

  executeSync(command, args);
}
