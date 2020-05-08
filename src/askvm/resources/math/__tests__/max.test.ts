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

test('max', () => {
  expect(ask('max(1, 2)')).toBe(2);
  expect(ask('max(1, 2, max(3, max([33, 13], 4)))')).toBe(33);
  expect(ask('max([1, 2, [5, 6]])')).toBe(6);
  expect(ask('max(scores)')).toBe(953);
  expect(ask(`object('a', 2, 'b', 4)`)).toStrictEqual({ a: 2, b: 4 });
  expect(ask(`max(object('a', 2, 'b', 4))`)).toBe(4);
  expect(ask('max(obj, [scores])')).toBe(953);
});
