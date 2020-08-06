import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { bitwiseAnd } from '../bitwiseAnd';
import { code } from '../../../lib';

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, bitwiseAnd },
    },
    parse(code)
  );
}

// test number lower bound, upper bound, expected numbers
test('operator', async () => {
  await expect(ask('bitwiseAnd(1, 1)')).resolves.toBe(1);
  await expect(ask('bitwiseAnd(0, 1)')).resolves.toBe(0);
  await expect(ask('bitwiseAnd(1, 0)')).resolves.toBe(0);
  await expect(ask('bitwiseAnd(0, 0)')).resolves.toBe(0);
  await expect(ask('bitwiseAnd(-55, -55)')).resolves.toBe(-55);
  await expect(ask('bitwiseAnd(-10, 10)')).resolves.toBe(2);
  // 32 bit integer test
  await expect(ask('bitwiseAnd(2147483647, 2147483647)')).resolves.toBe(
    2147483647
  );
  await expect(ask('bitwiseAnd(-2147483647, -2147483647)')).resolves.toBe(
    -2147483647
  );
});
