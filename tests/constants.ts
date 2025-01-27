import { join } from 'path';

export const TEMP_DIR = join(__dirname, '.temp');

export const DATA_DIR = join(TEMP_DIR, 'data');

export const TEST_FILES = [
  'inner dir',
  'test file 1.txt',
  'test file 2.md'
].map(fileName => join(DATA_DIR, fileName));

export const TEST_ZIP = join(TEMP_DIR, 'test zip.7z');

export const TEST_PASSWORD = 'yxASqw12';
