import { AskCodeOrValue } from '../../askcode';
import * as askjsx from '../../askjsx';

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Include AskScript parser
const parser = require('../parser/askscript.grammar');

function fromAst(ast: any): AskCodeOrValue {
  if (Array.isArray(ast)) {
    return ast.map(fromAst) as any;
  }

  if (ast == null || typeof ast !== 'object') {
    return ast;
  }

  const { name, props, children = [] } = ast;

  // Rewrite properties
  const newProps: Record<string, any> = {};
  for (const key in props) {
    newProps[key] = fromAst(props[key]);
  }

  // Rewrite children
  const newChildren = children.map(fromAst);

  return askjsx.createElement(name, newProps, ...newChildren);
}

function jsonprint(object: any) {
  return JSON.stringify(object, null, 2);
}

describe('AskScript parser can parse the .ask file', () => {
  function checkIfParsesFile(
    askScriptFilePath: string,
    expectedOutputFilePath: string
  ) {
    const code = fs.readFileSync(askScriptFilePath).toString();

    // AskScript -> AskJSX AST
    const ast = parser.parse(code).print();

    // console.log(path.parse(askScriptFilePath).base);
    // console.log('ast: ');
    // console.log(jsonprint(ast));
    const askJsxStructure = fromAst(ast);

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
    test(`parses ${parts2.name + '.ask'} successfully`, () => {
      checkIfParsesFile(askScriptFilePath, expectedOutputFilePath);
    });
    // break;
  }
});
