// Run a single .ask file
//
// Usage: npx ts-node --files src/askscript/__tests__/tools/run_ask_file.ts <path to .ask file> [<arg 1> <arg 2> .... <arg n> ]
// Provide each argument as its JSON representation, e.g. "'contents'" for a string 'contents', 32 or 32.3 for a number and '[1,2,3,4]' for an array, '{"a":1, "b":2, "c":3, "d":4}' for an object etc.

import { runAskFile } from '../../../utils/tools';

import * as path from 'path';

function usage() {
  console.log(
    `Usage: npx ts-node ${
      path.parse(process.argv[1]).base
    } <path to .ask file> [<arg 1> <arg 2> .... <arg n> ]\n`
  );
  console.log(
    `<arg x> - JSON representation of an argument, \n` +
      `          e.g. "'contents'" for a string 'contents', \n` +
      `          32 or 32.3 for a number, '[1,2,3,4]' for an array, \n` +
      `          '{"a":1, "b":2, "c":3, "d":4}' for an object etc.\n`
  );
}

function jsonprint(obj: any) {
  return JSON.stringify(obj, null, 2);
}

console.log(jsonprint(process.argv));

if (process.argv.length < 3) {
  usage();
  process.exit(1);
}

if (process.argv.length == 3 && process.argv[2] == '--help') {
  usage();
  process.exit(0);
}

const askFilePath = process.argv[2];

const args = process.argv.slice(3).map((arg) => JSON.parse(arg));

// Workaround to make the inclusion for askscript.grammar.pegjs.classes work
process.env.NODE_ENV = 'test';

runAskFile(askFilePath, args, true).then((result) => {
  console.log(`Result: ${jsonprint(result)}`);
});
