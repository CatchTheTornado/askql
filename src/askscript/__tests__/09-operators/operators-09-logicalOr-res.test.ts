import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('logicalOr resource', async () => {
  const environment = { resources };
  expect(await e2e('false:logicalOr(true)', environment)).toBe(true);
  expect(await e2e('true:logicalOr(true)', environment)).toBe(true);
  expect(await e2e('false:logicalOr(false)', environment)).toBe(false);
  expect(await e2e('true:logicalOr(false)', environment)).toBe(true);
  expect(await e2e('1:logicalOr(2)', environment)).toBe(1);
  expect(await e2e('0:logicalOr(1)', environment)).toBe(1);
  expect(await e2e('0:logicalOr(0)', environment)).toBe(0);
});
