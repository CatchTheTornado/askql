import * as fs from 'fs';
import * as path from 'path';
import * as peg from 'pegjs';

export type AskScriptAst = any; // TODO(lc)

let parser: any;

export function parse(
  code: string,
  options?: any,
  debugPrint?: boolean
): AskScriptAst {
  if (!parser) {
    const pegSource = fs.readFileSync(
      path.resolve(__dirname, './parser/askscript.grammar.pegjs'),
      'utf-8'
    );
    parser = peg.generate(pegSource);
    // parser = peg.generate(pegSource, {
    //   allowedStartRules: ['ask', 'queryFieldLeaf'],
    // }); // TODO(lc): remove debug
  }
  const ast = parser.parse(code, options);
  // TODO(lc): remove debug
  if (debugPrint) {
    console.log(`AST: \n${JSON.stringify(ast)}`);
  }
  return ast.print();
}
