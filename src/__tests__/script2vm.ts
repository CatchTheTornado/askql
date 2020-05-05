import * as fs from 'fs';
import * as path from 'path';
import { script } from '..';
import { parse } from '../askcode';
import * as jsx from '../askjsx';
import { run } from '../askvm';

function e2e(code: string): any {
  const ast = script.parser.parse(code).print();
  // console.log(1, ast.children[0]);
  const program = jsx.load(ast);
  // console.log(program.children[0].props);
  const rendered = jsx.render(program);
  // console.log(3, rendered);
  const parsed = parse(rendered);
  const result = run(parsed);
  return result;
}

test('long', () => {
  const code = fs
    .readFileSync(
      path.join(__dirname, '../askscript/__tests__/code/program03-string.ask')
    )
    .toString();
  const ast = script.parser.parse(code).print();
  const program = jsx.load(ast);
  expect(program).toBeDefined();
  const rendered = jsx.render(program);
  expect(rendered).toBe('call(fun("Hello world!"))');
  const parsed = parse(rendered);
  expect(parsed).toHaveProperty('type');
  const result = run(parsed);
  expect(result).toBe('Hello world!');
});

// test('e2e', () => {
//   expect(
//     e2e(`ask {
//     2 :toString
// }`)
//   ).toBe('Hello world!');
// });
