import { UnzipOptions } from './types';
import { execute, executeSync, getSevenZipPath } from './utils';

const DEFAULT_UNZIP_OPTIONS: UnzipOptions = {
  archive: '',
  destination: ''
};

/**
 * A wrapper class for extracting files from a 7-Zip archive using the
 * command-line tool.
 *
 * @example
 * ```ts
 * import { SevenUnzip } from 'cross-7zip';
 *
 * function extractArchiveSync(): void {
 *   try {
 *     const sevenUnzip = new SevenUnzip({
 *       archive: 'example.7z',
 *       destination: 'outputFolder',
 *       password: 'secure 123'
 *     });
 *
 *     sevenUnzip.runSync();
 *     console.log('Extraction completed successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during extraction:', error);
 *   }
 * }
 *
 * async function extractArchive(): Promise<void> {
 *   try {
 *     const sevenUnzip = new SevenUnzip()
 *       .setArchive('example.7z')
 *       .setDestination('outputFolder')
 *       .setPassword('secure 123');
 *
 *     await sevenUnzip.run();
 *     console.log('Extraction completed successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during extraction:', error);
 *   }
 * }
 * ```
 *
 * For additional examples, see the
 * [sevenZipUnzip.test.ts](https://github.com/rdarida/cross-7zip/blob/main/tests/sevenZipUnzip.test.ts)
 * or
 * [sevenZipUnzipSync.test.ts](https://github.com/rdarida/cross-7zip/blob/main/tests/sevenZipUnzipSync.test.ts).
 */
export class SevenUnzip {
  private readonly _options: UnzipOptions;

  /**
   * Gets the path to the 7-Zip executable.
   */
  public get command(): string | undefined {
    return getSevenZipPath();
  }

  /**
   * Generates the arguments for the 7-Zip command-line execution.
   */
  public get args(): string[] {
    const { archive, destination, password } = this._options;

    return [
      'x',
      archive,
      `-o${destination}`,
      password ? `-p${password}` : ''
    ].filter(v => !!v);
  }

  /**
   * Creates an instance of `SevenZip` with optional extraction settings.
   *
   * @param options Partial extraction options.
   */
  constructor(options?: Partial<UnzipOptions>) {
    this._options = {
      ...DEFAULT_UNZIP_OPTIONS,
      ...options
    };
  }

  /**
   * Sets the archive file to extract.
   *
   * @param archive The path to the archive file.
   * @returns The `SevenUnzip` instance for method chaining.
   */
  public setArchive(archive: string): this {
    this._options.archive = archive;
    return this;
  }

  /**
   * Sets the destination path for the extraction.
   *
   * @param destination The path to the output folder.
   * @returns The `SevenUnzip` instance for method chaining.
   */
  public setDestination(destination: string): this {
    this._options.destination = destination;
    return this;
  }

  /**
   * Sets a password for extracting encrypted archives.
   *
   * @param password The password string.
   * @returns The `SevenUnzip` instance for method chaining.
   */
  public setPassword(password: string): this {
    this._options.password = password;
    return this;
  }

  /**
   * Returns a string representation of the 7-Zip command with its arguments.
   *
   * This method constructs the full command-line string that would be executed,
   * ensuring that each argument is properly quoted to handle paths with spaces.
   *
   * @returns The formatted command-line string.
   */
  public toString(): string {
    return [this.command, ...this.args].map(v => `"${v}"`).join(' ');
  }

  /**
   * Runs the extraction process **asynchronously**.
   *
   * @throws {Error} If the 7-Zip executable is not found.
   */
  public async run(): Promise<void> {
    const { command, args } = this;

    if (!command) {
      throw new Error('7-Zip executable not found.');
    }

    return execute(command, args);
  }

  /**
   * Runs the extraction process **synchronously**.
   *
   * @throws {Error} If the 7-Zip executable is not found.
   */
  public runSync(): void {
    const { command, args } = this;

    if (!command) {
      throw new Error('7-Zip executable not found.');
    }

    executeSync(command, args);
  }
}
