// NOTE this file is only used in testing environment

import * as fs from 'fs';
import * as path from 'path';
import * as peg from 'pegjs';

const source = fs.readFileSync(
  path.resolve(__dirname, './askscript.grammar.pegjs'),
  'utf-8'
);

const { SyntaxError, parse } = peg.generate(source);
// const { SyntaxError, parse } = peg.generate(source, {
//   allowedStartRules: ['ask', 'queryFieldLeaf'],
// }); // TODO(lc): remove debug

export { SyntaxError, parse };
