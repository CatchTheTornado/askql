import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('logicalOr resource', async () => {
  const environment = { resources };
  await expect(e2e('false:logicalOr(true)', environment)).resolves.toBe(true);
  await expect(e2e('true:logicalOr(true)', environment)).resolves.toBe(true);
  await expect(e2e('false:logicalOr(false)', environment)).resolves.toBe(false);
  await expect(e2e('true:logicalOr(false)', environment)).resolves.toBe(true);
  await expect(e2e('1:logicalOr(2)', environment)).rejects.toStrictEqual(
    new Error('|| operator supports only boolean values')
  );
  await expect(e2e("'0':logicalOr(false)", environment)).rejects.toStrictEqual(
    new Error('|| operator supports only boolean values')
  );
  await expect(e2e('true:logicalOr(null)', environment)).rejects.toStrictEqual(
    new Error('|| operator supports only boolean values')
  );
});
