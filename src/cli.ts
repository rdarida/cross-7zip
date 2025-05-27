#!/usr/bin/env node
import yargs from 'yargs';

import texts from './texts.json';
import { UnzipOptions, ZipOptions, sevenUnzipSync, sevenZipSync } from '.';

yargs
  .scriptName('seven')
  .usage('$0 <cmd> [args]', texts.description)
  .demandCommand(1, texts.demandMsg)
  .command<UnzipOptions>(
    'unzip <archive> [destination]',
    texts.unzip.description,
    yargs => {
      return yargs
        .example('$0 unzip archive.7z destination', texts.unzip.example)
        .positional('archive', {
          demandOption: true,
          describe: texts.unzip.args.archive,
          type: 'string'
        })
        .positional('destination', {
          describe: texts.unzip.args.destination,
          type: 'string'
        })
        .option('password', {
          alias: 'p',
          describe: texts.unzip.args.password,
          type: 'string'
        });
    },
    args => {
      args = {
        ...args,
        destination: args.destination ?? process.cwd()
      };

      sevenUnzipSync(args);
    }
  )
  .command<ZipOptions>(
    'zip <destination> [files...]',
    texts.zip.description,
    yargs => {
      return yargs
        .example('$0 zip dest.7z file1 file2.txt folder', texts.zip.example)
        .positional('destination', {
          demandOption: true,
          describe: texts.zip.args.destination,
          type: 'string'
        })
        .positional('files', {
          describe: texts.zip.args.files,
          type: 'string',
          array: true
        })
        .option('level', {
          alias: 'l',
          describe: texts.zip.args.level,
          type: 'number',
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          default: 5
        })
        .option('password', {
          alias: 'p',
          describe: texts.zip.args.password,
          type: 'string'
        })
        .option('overwrite', {
          alias: 'o',
          describe: texts.zip.args.overwrite,
          type: 'boolean'
        });
    },
    args => {
      sevenZipSync(args);
    }
  )
  .help()
  .strict()
  .parseSync();
