import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { max } from '../max';

function ask(code: string) {
  return runUntyped(
    {
      values: {
        scores: [1, 2, 3, 4, 5],
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
  expect(ask('max(scores)')).toBe(5);
});
