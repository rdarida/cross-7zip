/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    fileParallelism: false,
    globalSetup: ['./tests/globalSetup.ts'],
    coverage: {
      enabled: false, // npm test -- --coverage
      provider: 'istanbul',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['dist/', 'src/**/*.d.ts', 'src/cli.ts', 'tests/']
    },
    globals: true,
    watch: false
  }
});
