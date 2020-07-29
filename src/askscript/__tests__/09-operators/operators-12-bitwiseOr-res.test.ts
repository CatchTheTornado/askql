import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('bitwiseOr_res', async () => {
  const environment = { resources };
  expect(await e2e('0:bitwiseOr(0)', environment)).toBe(0);
  expect(await e2e('0:bitwiseOr(1)', environment)).toBe(1);
  expect(await e2e('1:bitwiseOr(0)', environment)).toBe(1);
  expect(await e2e('1:bitwiseOr(1)', environment)).toBe(1);
  expect(await e2e('9:bitwiseOr(-9)', environment)).toBe(-1);
  expect(await e2e('100:bitwiseOr(-100)', environment)).toBe(-4);
  expect(await e2e('123:bitwiseOr(321)', environment)).toBe(379);
});
