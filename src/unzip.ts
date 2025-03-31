import { UnzipOptions } from './types';
import { SevenUnzip } from './SevenUnzip';

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
