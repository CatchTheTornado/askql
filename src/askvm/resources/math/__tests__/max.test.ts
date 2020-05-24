import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { max } from '../max';

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
      resources: { ...core, max },
    },
    parse(code)
  );
}

test('max', async () => {
  await expect(ask('max(1, 2)')).resolves.toBe(2);
  // await expect(() => ask(`max(1, '2')`)).rejects.toBeTruthy(); // TODO FIXME
  await expect(ask('max(1, 2, max(3, max([33, 13], 4)))')).resolves.toBe(33);
  await expect(ask('max([1, 2, [5, 6]])')).resolves.toBe(6);
  await expect(ask('max(scores)')).resolves.toBe(953);
  await expect(ask(`object('a', 2, 'b', 4)`)).resolves.toStrictEqual({
    a: 2,
    b: 4,
  });
  await expect(ask(`max(object('a', 2, 'b', 4))`)).resolves.toBe(4);
  await expect(ask('max(obj, [scores])')).resolves.toBe(953);
});
