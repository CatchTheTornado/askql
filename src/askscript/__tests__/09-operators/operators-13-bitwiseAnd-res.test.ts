import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('bitwiseAnd_operator', async () => {
  const environment = { resources };
  expect(await e2e('1:bitwiseAnd(1)', environment)).toBe(1);
  expect(await e2e('0:bitwiseAnd(1)', environment)).toBe(0);
  expect(await e2e('1:bitwiseAnd(0)', environment)).toBe(0);
  expect(await e2e('0:bitwiseAnd(0)', environment)).toBe(0);
  expect(await e2e('-55:bitwiseAnd(-55)', environment)).toBe(-55);
  expect(await e2e('10:bitwiseAnd(-10)', environment)).toBe(2);
  expect(await e2e('2147483647:bitwiseAnd(2147483647)', environment)).toBe(
    2147483647
  );
});
