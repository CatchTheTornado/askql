import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('bitwiseAnd_operator', async () => {
  const environment = { resources };
  expect(await e2e('1 & 1', environment)).toBe(1);
  expect(await e2e('0 & 1', environment)).toBe(0);
  expect(await e2e('1 & 0', environment)).toBe(0);
  expect(await e2e('0 & 0', environment)).toBe(0);
  expect(await e2e('-55 & -55', environment)).toBe(-55);
  expect(await e2e('-10 & 10', environment)).toBe(2);
});
