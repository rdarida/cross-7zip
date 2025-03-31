import { ZipOptions } from './types';
import { SevenZip } from './SevenZip';

/**
 * Compresses multiple files into a zipped file **asynchronously**.
 *
 * @param options An object containing options for the compression process.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * ```ts
 * import { ZipOptions, sevenZip } from 'cross-7zip';
 *
 * async function createArchive() {
 *   try {
 *     const zipOptions: ZipOptions = {
 *       destination: 'example.7z',
 *       files: ['document.txt', 'image.png', 'folder']
 *     };
 *
 *     await sevenZip(zipOptions);
 *     console.log('Archive created successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during compression:', error);
 *   }
 * }
 * ```
 *
 * For additional examples, see the
 * [test file](https://github.com/rdarida/cross-7zip/blob/main/tests/zipUnzip.test.ts).
 */
export async function sevenZip(options: ZipOptions): Promise<void> {
  const sevenZip = new SevenZip(options);
  return sevenZip.run();
}
