import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { bitwiseOr } from '../bitwiseOr';

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, bitwiseOr },
    },
    parse(code)
  );
}

// test number lower bound, upper bound, expected numbers
test('bitwiseOr', async () => {
  await expect(ask('bitwiseOr(0, 0)')).resolves.toBe(0);
  await expect(ask('bitwiseOr(0, 1)')).resolves.toBe(1);
  await expect(ask('bitwiseOr(1, 0)')).resolves.toBe(1);
  await expect(ask('bitwiseOr(1, 1)')).resolves.toBe(1);
  await expect(ask('bitwiseOr(9, -9)')).resolves.toBe(-1);
  await expect(ask('bitwiseOr(123, 321)')).resolves.toBe(379);
});
