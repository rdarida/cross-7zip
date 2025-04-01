import { rimrafSync } from 'rimraf';

import { TEMP_DIR } from './constants';

export default function globalTeardown(): void {
  rimrafSync(TEMP_DIR);
}
