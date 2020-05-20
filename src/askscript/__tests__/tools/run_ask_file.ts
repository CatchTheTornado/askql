// Run a single .ask file
//
// Usage: npx ts-node --files src/askscript/__tests__/tools/run_ask_file.ts <path to .ask file>

import { runAskFile } from '../../../utils/tools';

function usage() {
  console.log(`Usage: ${process.argv[1]} <.ask file>`);
}

function jsonprint(obj: any) {
  return JSON.stringify(obj, null, 2);
}

console.log(jsonprint(process.argv));

if (process.argv.length != 3) {
  usage();
  process.exit(1);
}

const askFilePath = process.argv[2];

// Workaround to make the inclusion for askscript.grammar.pegjs.classes work
process.env.NODE_ENV = 'test';

runAskFile(askFilePath, true).then((result) => {
  console.log(`Result: ${jsonprint(result)}`);
});
