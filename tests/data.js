#!/usr/bin/env node
const { join, resolve } = require('path');
const { rimrafSync } = require('rimraf');
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { EOL } = require('os');

const ROOT_DIR = resolve(__dirname, '..');
const TESTS_DIR = join(ROOT_DIR, 'tests');

(() => {
  const dataDir = join(TESTS_DIR, 'data');

  if (existsSync(dataDir)) {
    if (process.platform === 'win32') {
      rimrafSync(dataDir);
    }
  } else {
    mkdirSync(dataDir);
  }

  const tempDir = join(ROOT_DIR, '.temp');

  if (existsSync(tempDir)) {
    rimrafSync(tempDir);
  }

  mkdirSync(tempDir, { recursive: true });

  [1, 2].forEach(v => {
    const fileName = `test ${v}.txt`;
    const filePath = join(tempDir, fileName);
    writeFileSync(filePath, `Hello, ${fileName}!` + EOL);
  });

  const innerDir = join(tempDir, 'inner folder');

  mkdirSync(innerDir);

  [1, 2].forEach(v => {
    const fileName = `inner test ${v}.md`;
    const filePath = join(innerDir, fileName);
    writeFileSync(filePath, `Hello, ${fileName}!` + EOL);
  });
})();
