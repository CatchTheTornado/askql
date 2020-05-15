// Generates result for all .ask programs which don't have a corresponding .result.tsx nor .result.tsx.notImplemented file
// using the result from the AskQL runtime. Please note that we are using the runtime itself to generate
// files with which the AskQL runtime will be later compared during tests. Please please read each and every such
// file to make sure the result is correct and fix any mistake.
//
// This script was found useful when adding files with expected output for a dozen of .ask test files at once, because it is easier to eyeball the result
// than to manually create new file, make sure its name is without typos and then type the code, even if it's just one line.
//
// Usage: npx ts-node src/askscript/__tests__/tools/gen_test_results.ts     (no args)
//

export {}; // This dummy line converts this file to a module.

import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

import * as util from 'util';
import { runAskFile } from '../../../utils/tools';

const myLogger = util.debuglog('');

const askScriptFilesGlobPath = path.join(
  __dirname,
  '..',
  '[0-9][0-9]-*',
  '*.ask'
);
const askScriptFilePaths = glob.sync(askScriptFilesGlobPath);
console.log('All .ask files: \n');
console.log(askScriptFilePaths);
console.log('\n===================================\n\n');

const promise = runFiles(askScriptFilePaths);

async function runFiles(
  askScriptFilePaths: string[]
): Promise<Record<string, number>> {
  let filesGenerated: number = 0;
  let notImplementedFilesGenerated: number = 0;

  for (const askScriptFilePath of askScriptFilePaths) {
    const parts = path.parse(askScriptFilePath);
    const outputFilePath = path.join(parts.dir, `${parts.name}.result.tsx`);
    const outputFileNotImplementedPath = path.join(
      parts.dir,
      `${parts.name}.result.tsx.notImplemented`
    );

    if (parts.base == 'program15c-function_def_args.ask') continue; // This test hangs

    // If the output file does not exist, create it from the current AskQL result.
    // Of course later on you need to eyeball it to check whether it looks OK.
    if (
      !fs.existsSync(outputFilePath) &&
      !fs.existsSync(outputFileNotImplementedPath)
    ) {
      let fileContents;
      let outputFilePathToSave;
      let result;

      try {
        result = await runAskFile(
          askScriptFilePath,
          { values: {}, resources: {} },
          true
        );
        outputFilePathToSave = outputFilePath;

        fileContents = `export const expectedResult = ${JSON.stringify(
          result,
          null,
          2
        )};\n`;

        ++filesGenerated;
      } catch (reason) {
        const myLogger = util.debuglog('');

        outputFilePathToSave = outputFileNotImplementedPath;

        myLogger(
          `Error when executing file ${parts.base}: ${reason.message}`,
          `    script will generate ${path.parse(outputFilePathToSave).base}`,
          `\n\n----------\n\n`
        );

        fileContents =
          `// AskVM Error: \n` +
          `//   ${reason.message}\n` +
          `export const expectedResult = ???;\n`;

        ++notImplementedFilesGenerated;
      }

      const askScriptCode = fs.readFileSync(askScriptFilePath).toString();
      myLogger(`Filename: ${askScriptFilePath}\n\n`);
      myLogger(askScriptCode);
      myLogger('\n\n----\n\n');
      myLogger(fileContents);
      myLogger('\n\n----\n\n');
      myLogger(`Saving result in file as ${outputFilePathToSave}\n`);
      fs.writeFileSync(outputFilePathToSave, fileContents);
      myLogger('\n===================================\n\n');
    }
  }
  return { filesGenerated, notImplementedFilesGenerated };
}

promise.then(({ filesGenerated, notImplementedFilesGenerated }) => {
  myLogger('\n\n\n');
  if (filesGenerated + notImplementedFilesGenerated == 0) {
    myLogger(
      'No new files generated as all .out.tsx and .out.tsx.notImplemented files already existed.'
    );
  } else {
    myLogger(
      `Generated ${filesGenerated} new .out.tsx file(s) and ${notImplementedFilesGenerated} new .out.tsx.notImplemented file(s).`
    );
  }
  myLogger('\n\n');
});
