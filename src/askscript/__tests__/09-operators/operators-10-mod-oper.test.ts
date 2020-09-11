import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('mod operator', async () => {
  const environment = { resources };
  await expect(e2e('1998 % 9', environment)).resolves.toBe(0);
  await expect(e2e('9 % 2', environment)).resolves.toBe(1);
  await expect(e2e('51.2 % 13', environment)).resolves.toBe(12.200000000000003);
  await expect(e2e('82 % 4.5', environment)).resolves.toBe(1.0);
  await expect(e2e('18.4 % 8.20', environment)).resolves.toBe(2);
});
