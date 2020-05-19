import * as parser from './parser/askscript.parser';

export type AskScriptAst = any; // TODO(lc)

export function parse(
  code: string,
  options?: any,
  debugPrint?: boolean
): AskScriptAst {
  const ast = parser.parse(code, options);
  if (debugPrint) {
    console.log(`AST: \n${JSON.stringify(ast)}`);
  }
  return ast.print();
}
