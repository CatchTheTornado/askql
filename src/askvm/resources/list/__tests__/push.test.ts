import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { push } from '../push';

const values = {
  arrayValue: [1, 2, 3, 4, 5],
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, push },
      values,
    },
    parse(code)
  );
}

test('push', async () => {
  await expect(ask(`push(list(1,2,3,4), 6)`)).resolves.toStrictEqual([
    1,
    2,
    3,
    4,
    6,
  ]);

  await expect(ask(`push(list('a', 'b', 'c'), 'd')`)).resolves.toStrictEqual([
    'a',
    'b',
    'c',
    'd',
  ]);
});
