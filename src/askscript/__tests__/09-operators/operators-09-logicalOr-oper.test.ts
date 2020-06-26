import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('logicalOr operator', async () => {
  const environment = { resources };
  expect(await e2e('false || true', environment)).toBe(true);
  expect(await e2e('true || true', environment)).toBe(true);
  expect(await e2e('false || false', environment)).toBe(false);
  expect(await e2e('true || false', environment)).toBe(true);
  expect(await e2e('1 || 2', environment)).toBe(1);
  expect(await e2e('0 || 1', environment)).toBe(1);
  expect(await e2e('0 || 0', environment)).toBe(0);
});
