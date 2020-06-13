import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('greaterThanOrEqual', async () => {
  const environment = { resources };
  expect(await e2e('2:greaterThanOrEqual(1)', environment)).toBe(true);
  expect(await e2e('2:greaterThanOrEqual(2)', environment)).toBe(true);
  expect(await e2e('2.22:greaterThanOrEqual(2)', environment)).toBe(true);
  expect(await e2e('2:greaterThanOrEqual(2.22)', environment)).toBe(false);
  expect(await e2e('1:greaterThanOrEqual(2)', environment)).toBe(false);
});
