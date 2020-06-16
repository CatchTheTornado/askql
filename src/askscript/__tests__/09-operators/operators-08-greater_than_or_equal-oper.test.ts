import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('lessThanOrEqual', async () => {
  const environment = { resources };
  expect(await e2e('2 >= 1', environment)).toBe(true);
  expect(await e2e('2 >= 2', environment)).toBe(true);
  expect(await e2e('2.22 >= 2', environment)).toBe(true);
  expect(await e2e('2 >= 2.22', environment)).toBe(false);
  expect(await e2e('1 >= 2', environment)).toBe(false);
});
