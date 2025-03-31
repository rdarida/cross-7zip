import { ZipOptions, UnzipOptions } from './types';
import { SevenZip } from './SevenZip';
import { SevenUnzip } from './SevenUnzip';

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
 * async function createArchive(): Promise<void> {
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

/**
 * Extracts files from a specified zipped file **asynchronously**.
 *
 * @param options An object containing options for the extraction process.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * ```ts
 * import { UnzipOptions, sevenUnzip } from 'cross-7zip';
 *
 * async function extractFiles(): Promise<void> {
 *   try {
 *     const unzipOptions: UnzipOptions = {
 *       archive: 'example.7z',
 *       destination: './output'
 *     };
 *
 *     await sevenUnzip(unzipOptions);
 *     console.log('Extraction completed successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during extraction:', error);
 *   }
 * }
 * ```
 *
 * For additional examples, see the
 * [test file](https://github.com/rdarida/cross-7zip/blob/main/tests/zipUnzip.test.ts).
 */
export async function sevenUnzip(options: UnzipOptions): Promise<void> {
  const sevenUnzip = new SevenUnzip(options);
  return sevenUnzip.run();
}
