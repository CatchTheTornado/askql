import { fromAskScriptAst } from '../askjsx';
import { parse } from '../askscript';
import { resources, runUntyped } from '../askvm';

function e2e(script: string): any {
  return runUntyped(
    {
      resources,
    },
    fromAskScriptAst(parse(script))
  );
}

test('e2e', async () => {
  await expect(
    e2e(`ask {
  'Hello world!'
}`)
  ).resolves.toBe('Hello world!');
});
