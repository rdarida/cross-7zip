#!/usr/bin/env node
import yargs from 'yargs';

import texts from './texts.json';
import { sevenZipSync, sevenUnzipSync } from '.';

type ZipArgs = {
  destination: string;
  paths: string[];
};

type UnzipArgs = {
  archive: string;
  destination: string;
};

yargs
  .scriptName('seven')
  .usage('$0 <cmd> [args]', texts.description)
  .demandCommand(1, texts.demandMsg)
  .command<ZipArgs>(
    'zip <destination> <paths...>',
    texts.zip.description,
    yargs => {
      return yargs
        .example('$0 zip dest.7z file1 file2.txt folder', texts.zip.example)
        .positional('destination', {
          demandOption: true,
          describe: texts.zip.args.destination,
          type: 'string'
        })
        .positional('paths', {
          demandOption: true,
          describe: texts.zip.args.paths,
          type: 'string',
          array: true
        });
    },
    args => {
      try {
        sevenZipSync(args.paths, args.destination);
      } catch (e: any) {
        console.error(e);
      }
    }
  )
  .command<UnzipArgs>(
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
        const destination = args.destination ?? process.cwd();
        sevenUnzipSync(args.archive, destination);
      } catch (e: any) {
        console.error(e);
      }
    }
  )
  .help()
  .strict()
  .parseSync();
