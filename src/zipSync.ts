import { ZipOptions } from './types';
import { SevenZip } from './SevenZip';

/**
 * Compresses multiple files into a zipped file **synchronously**.
 *
 * @param options An object containing options for the compression process.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * ```ts
 * import { ZipOptions, sevenZipSync } from 'cross-7zip';
 *
 * function createArchiveSync() {
 *   try {
 *     const zipOptions: ZipOptions = {
 *       destination: 'example.7z',
 *       files: ['document.txt', 'image.png', 'folder']
 *     };
 *
 *     sevenZipSync(zipOptions);
 *     console.log('Archive created successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during compression:', error);
 *   }
 * }
 * ```
 *
 * For additional examples, see the
 * [test file](https://github.com/rdarida/cross-7zip/blob/main/tests/zipUnzipSync.test.ts).
 */
export function sevenZipSync(options: ZipOptions): void {
  const sevenZip = new SevenZip(options);
  sevenZip.runSync();
}
