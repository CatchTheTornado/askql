import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('lessThanOrEqual', async () => {
  const environment = { resources };
  expect(await e2e('4:lessThanOrEqual(5)', environment)).toBe(true);
  expect(await e2e('5:lessThanOrEqual(5)', environment)).toBe(true);
  expect(await e2e('5:lessThanOrEqual(5.01)', environment)).toBe(true);
  expect(await e2e('5.01:lessThanOrEqual(5)', environment)).toBe(false);
  expect(await e2e('6:lessThanOrEqual(5)', environment)).toBe(false);
});
