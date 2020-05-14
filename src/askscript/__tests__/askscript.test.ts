import { fromAskScriptAst } from '../../askjsx';
import { parse } from '../../askscript';

const fs = require('fs');
const glob = require('glob');
const path = require('path');

function jsonprint(object: any) {
  return JSON.stringify(object, null, 2);
}

describe('AskScript parser can parse the .ask file', () => {
  function checkIfParsesFile(absoluteFilePath: string) {
    const code = fs.readFileSync(absoluteFilePath).toString();

    // AskScript -> AskJSX AST
    const askJsxStructure = parse(code);

    expect(askJsxStructure).not.toBeNull();
  }

  const testsGlobPath = path.join(__dirname, 'code', '*.ask');
  const testFilenames = glob.sync(testsGlobPath);

  for (const testFilename of testFilenames) {
    const parts = path.parse(testFilename);
    test(`parses successfully ${parts.base}`, () => {
      checkIfParsesFile(testFilename);
    });
  }
});

describe('AskScript parser produces correct output', () => {
  function checkIfParsedFileMatchesOutput(
    askScriptFilePath: string,
    expectedOutputFilePath: string
  ) {
    const code = fs.readFileSync(askScriptFilePath).toString();

    // AskScript -> AskJSX AST
    const ast = parse(code);

    // TODO(lc): remove comments when cleaning up the repository

    // console.log(path.parse(askScriptFilePath).base);
    // console.log('ast: ');
    // console.log(jsonprint(ast));
    const askJsxStructure = fromAskScriptAst(ast);

    // console.log('expectedOutputFilePath: ' + expectedOutputFilePath);
    const debug1 = require(expectedOutputFilePath);
    // const debug1 = require('./tools/debug1.out');

    // console.log('expectedOutput:');
    // console.log(JSON.stringify(debug1.expectedOutput, null, 2));

    // console.log('askJsxStructure:');
    // console.log(JSON.stringify(askJsxStructure, null, 2));

    expect(askJsxStructure).not.toBeNull();

    expect(askJsxStructure).toEqual(debug1.expectedOutput);
  }

  const expectedOutputFilesGlobPath = path.join(
    __dirname,
    '[0-9][0-9]-*',
    '*.out.tsx'
  );
  const expectedOutputFilePaths = glob.sync(expectedOutputFilesGlobPath);

  for (const expectedOutputFilePath of expectedOutputFilePaths) {
    const parts1 = path.parse(expectedOutputFilePath);
    const parts2 = path.parse(parts1.name);

    const askScriptFilePath = path.join(parts1.dir, parts2.name + '.ask');

    const parts = path.parse(askScriptFilePath);
    // if (parts.base != 'program14d-method_call_args.ask') continue;
    test(`produces correct output for ${parts2.name + '.ask'}`, () => {
      checkIfParsedFileMatchesOutput(askScriptFilePath, expectedOutputFilePath);
    });
    // break;
  }
});
