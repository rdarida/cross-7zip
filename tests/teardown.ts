import { rimrafSync } from 'rimraf';

import { TEMP_DIR } from './constants';

export default function globalSetup(): void {
  rimrafSync(TEMP_DIR);
}
