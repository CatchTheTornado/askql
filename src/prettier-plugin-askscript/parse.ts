import { parseToAst, AskScriptAst } from '../askscript';

// TODO certain files must not be prettified for test to make sense
// use pragma for that of prettier ignore

export function parse(
  text: string,
  parsers: object,
  options: object
): AskScriptAst {
  return parseToAst(text);
}

export type AST = AskScriptAst;
