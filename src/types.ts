export type UnzipOptions = {
  /**
   * Specifies the path to the zipped file.
   */
  archive: string;
  /**
   * Specifies the path to the output directory.
   */
  destination: string;
};

export type ZipOptions = {
  /**
   * Specifies the path to the output zipped file.
   */
  destination: string;
  /**
   * Specifies the paths to the files to add to the zipped file.
   */
  paths: string[];
};
