#!/usr/bin/env node
import yargs from 'yargs';

import texts from './texts.json';
import { ZipOptions, UnzipOptions, sevenZipSync, sevenUnzipSync } from '.';

yargs
  .scriptName('seven')
  .usage('$0 <cmd> [args]', texts.description)
  .demandCommand(1, texts.demandMsg)
  .command<ZipOptions>(
    'zip <destination> <files...>',
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
          demandOption: true,
          describe: texts.zip.args.files,
          type: 'string',
          array: true
        });
    },
    args => {
      try {
        sevenZipSync(args);
      } catch (e: any) {
        console.error(e);
      }
    }
  )
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
        });
    },
    args => {
      try {
        args = {
          ...args,
          destination: args.destination ?? process.cwd()
        };

        sevenUnzipSync(args);
      } catch (e: any) {
        console.error(e);
      }
    }
  )
  .help()
  .strict()
  .parseSync();
