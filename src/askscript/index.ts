import * as fs from 'fs';
import * as path from 'path';
import * as peg from 'pegjs';

export type AskScriptAst = any; // TODO(lc)

let parser: any;

export function parse(code: string, options?: any): AskScriptAst {
  if (!parser) {
    const pegSource = fs.readFileSync(
      path.resolve(__dirname, './parser/askscript.grammar.pegjs'),
      'utf-8'
    );
    parser = peg.generate(pegSource);
  }
  const result = parser.parse(code, options);
  return result.print();
}
