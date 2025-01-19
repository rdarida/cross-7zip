import { join } from 'path';

export const TEMP_DIR = join(__dirname, '.temp');

export const FILE_PATHS = [
  'test file 1.txt',
  'test file 2.md',
  join('inner dir', 'test file 3.txt'),
  join('inner dir', 'test file 4.md')
].map(fileName => join(TEMP_DIR, fileName));
