import { AskCodeOrValue } from '../askcode';
import { fromAskScriptAst } from '../askjsx';
import * as parser from './parser/askscript.parser';

export type AskJSON = any; // TODO(lc)

export function parseToJSON(
  code: string,
  options?: any,
  debugPrint?: boolean
): AskJSON {
  const ast = parser.parse(code, options);
  if (debugPrint) {
    console.log(`AST: \n${JSON.stringify(ast)}`);
  }
  return ast.print();
}

export function parse(
  code: string,
  options?: any,
  debugPrint?: boolean
): AskCodeOrValue {
  return fromAskScriptAst(parseToJSON(code, options, debugPrint));
}
