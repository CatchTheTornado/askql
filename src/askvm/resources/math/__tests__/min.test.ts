import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { min } from '../min';

function ask(code: string) {
  return runUntyped(
    {
      values: {
        obj: {
          a: 4,
          b: 123,
          c: 345,
        },
        scores: [1, 2, 3, 953, 5],
      },
      resources: { ...core, min },
    },
    parse(code)
  );
}

test('min', async () => {
  await expect(ask('min(1, 2)')).resolves.toBe(1);
  // await expect(() => ask(`min(1, '2')`)).rejects.toBeTruthy(); // TODO FIXME
  await expect(ask('min(2, 3, min(4, min([1, 13], 5)))')).resolves.toBe(1);
  await expect(ask('min([2, 3, [1, 6]])')).resolves.toBe(1);
  await expect(ask('min(scores)')).resolves.toBe(1);
  await expect(ask(`object('a', 2, 'b', 4)`)).resolves.toStrictEqual({
    a: 2,
    b: 4,
  });
  await expect(ask(`min(object('a', 2, 'b', 4))`)).resolves.toBe(2);
  await expect(ask('min(obj, [scores])')).resolves.toBe(1);
});
