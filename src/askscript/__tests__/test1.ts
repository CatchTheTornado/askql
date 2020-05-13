import { AskCodeOrValue } from '../../askcode';
import * as askjsx from '../../askjsx';

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Include AskScript parser
const parser = require('../parser/askscript.grammar');

function fromAst({ name, props, children = [] }: any): AskCodeOrValue {
  return askjsx.createElement(name, props, ...children.map(fromAst));
}

function jsonprint(object: any) {
  return JSON.stringify(object, null, 2);
}

describe('AskScript parser can parse the .ask file', () => {
  function checkIfParsesFile(absoluteFilePath: string) {
    const code = fs.readFileSync(absoluteFilePath).toString();

    // AskScript -> AskJSX AST
    const ast = parser.parse(code).print();
    console.log('ast: ');
    console.log(jsonprint(ast));
    const askJsxStructure = fromAst(ast);

    const debug1 = require('./tools/debug1.out');

    console.log('expectedOutput:');
    console.log(JSON.stringify(debug1.expectedOutput, null, 2));

    console.log('askJsxStructure:');
    console.log(JSON.stringify(askJsxStructure, null, 2));

    expect(askJsxStructure).not.toBeNull();

    expect(askJsxStructure).toEqual(debug1.expectedOutput);
  }

  test(`parses successfully`, () => {
    checkIfParsesFile(path.join(__dirname, 'tools', 'debug1.ask'));
  });
});
