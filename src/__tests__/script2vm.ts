import { script as askscript } from '..';
import { AskCodeOrValue } from '../askcode';
import { createElement } from '../askjsx';
import { resources, runUntyped } from '../askvm';

function fromAst({ name, props, children = [] }: any): AskCodeOrValue {
  return createElement(name, props, ...children.map(fromAst));
}

function e2e(script: string): any {
  const ast = askscript.parser.parse(script).print();
  const code = fromAst(ast);
  return runUntyped(
    {
      resources,
    },
    code
  );
}

test('e2e', () => {
  expect(
    e2e(`ask {
    'Hello world!'
}`)
  ).toBe('Hello world!');
});
