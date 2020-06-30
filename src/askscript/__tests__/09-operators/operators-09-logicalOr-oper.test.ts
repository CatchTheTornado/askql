import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('logicalOr operator', async () => {
  const environment = { resources };
  await expect(e2e('false || true', environment)).resolves.toBe(true);
  await expect(e2e('true || true', environment)).resolves.toBe(true);
  await expect(e2e('false || false', environment)).resolves.toBe(false);
  await expect(e2e('true || false', environment)).resolves.toBe(true);
  await expect(e2e('1 || 2', environment)).rejects.toStrictEqual(
    new Error('|| operator supports only boolean values')
  );
  await expect(e2e("'0' || false", environment)).rejects.toStrictEqual(
    new Error('|| operator supports only boolean values')
  );
  await expect(e2e('true || null', environment)).rejects.toStrictEqual(
    new Error('|| operator supports only boolean values')
  );
});
