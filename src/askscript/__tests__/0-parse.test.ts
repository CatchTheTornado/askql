// Usage:
//   -- To run this test suite only, run: --
//    npm test src/askscript/__tests__/0-parse.test.ts
//
//   -- To run this test for a single file only, run: --
//    ASK_FILE=<path_to_.ask_file> npm test src/askscript/__tests__/0-parse.test.ts
//

import { parse } from '..';

import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as process from 'process';
import * as util from 'util';

const myLogger = util.debuglog('');

function jsonprint(object: any) {
  return JSON.stringify(object, null, 2);
}

describe('AskScript parser can parse the .ask file', () => {
  function checkIfParsesFile(absoluteFilePath: string) {
    const code = fs.readFileSync(absoluteFilePath).toString();

    try {
      // AskScript -> AskJSX AST
      const askJsxStructure = parse(code);
      expect(askJsxStructure).not.toBeNull();
    } catch (e) {
      // console.log('Error stack', e.stack);
      // const message = `${e.name: }`
      const error = new Error();
      error.name = e.name;
      error.message = `${e.message}\nLocation:\n${JSON.stringify(
        e.location,
        null,
        2
      )}`;
      error.stack = e.stack;

      // console.log('Error name', e.name);
      // console.log('Error message', e.message);
      // console.log('Error found', e.found);
      // console.log('Error expected', e.expected);
      // console.log('Error location', e.location);

      throw error;
    }
  }

  function testAskFile(testFilename: string) {
    const parts = path.parse(testFilename);
    test(`parses successfully ${parts.base}`, () => {
      checkIfParsesFile(testFilename);
    });
  }

  if (typeof process.env.ASK_FILE === 'undefined') {
    const testsGlobPath = path.join(__dirname, '*', '*.ask');
    const testFilenames = glob.sync(testsGlobPath);

    for (const testFilename of testFilenames) {
      testAskFile(testFilename);
    }
  } else {
    myLogger(`Running a single test for file ${process.env.ASK_FILE}`);
    const testFilename = path.resolve(__dirname, process.env.ASK_FILE);
    testAskFile(testFilename);
  }
});
