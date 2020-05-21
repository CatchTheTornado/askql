import { AskCodeOrValue } from '../askcode';
import { fromAskScriptAst } from '../askjsx';
import * as parser from './parser/askscript.parser';

export type AskJSON = any; // TODO(lc)

export function parseToJSON(
  code: string,
  options?: any,
  debugPrint?: boolean
): AskJSON {
  try {
    const ast = parser.parse(code, options);
    if (debugPrint) {
      console.log(`AST: \n${JSON.stringify(ast)}`);
    }
    return ast.print();
  } catch (e) {
    const error = new Error();
    error.name = e.name;
    error.message = `${e.message}\nLocation: ${JSON.stringify(
      e.location,
      null,
      2
    )}`;

    throw error;
  }
}

export function parse(
  code: string,
  options?: any,
  debugPrint?: boolean
): AskCodeOrValue {
  return fromAskScriptAst(parseToJSON(code, options, debugPrint));
}
