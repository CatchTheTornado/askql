import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('bitwiseOr_oper', async () => {
  const environment = { resources };
  expect(await e2e('0 | 0', environment)).toBe(0);
  expect(await e2e('0 | 1', environment)).toBe(1);
  expect(await e2e('1 | 0', environment)).toBe(1);
  expect(await e2e('1 | 1', environment)).toBe(1);
  expect(await e2e('9 | -9', environment)).toBe(-1);
  expect(await e2e('100 | -100', environment)).toBe(-4);
});
