import { parseToAst, AskScriptAst } from '../askscript';

// TODO certain files must not be prettified for test to make sense
// use pragma for that of prettier ignore

export type AST = AskScriptAst;

export function parse(
  text: string,
  parsers: object,
  options: object
): AskScriptAst {
  const ast = parseToAst(text);
  if (ast == null || typeof ast !== 'object') {
    return {
      jsxValue: ast,
    };
  }
  return parseToAst(text);
}
