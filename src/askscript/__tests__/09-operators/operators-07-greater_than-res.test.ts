import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('lessThanOrEqual', async () => {
  const environment = { resources };
  expect(await e2e('6:greaterThan(5)', environment)).toBe(true);
  expect(await e2e('5:greaterThan(5)', environment)).toBe(false);
  expect(await e2e('5.01:greaterThan(5)', environment)).toBe(true);
  expect(await e2e('4:greaterThan(5)', environment)).toBe(false);
  expect(await e2e('-2:greaterThan(-3)', environment)).toBe(true);
});
