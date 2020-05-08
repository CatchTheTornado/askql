import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { max } from '../max';

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, max },
    },
    parse(code)
  );
}

test('max', () => {
  expect(ask('max(1, 2)')).toBe(2);
  expect(ask('max(1, 2, max(3, max(33, 13, 4)))')).toBe(33);
});
