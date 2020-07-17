import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('while without curly braces should be prohibited', async () => {
  const environment = { resources };
  const code = `ask {
  const n = 3
  while ((n==0) || (n == 1))
    return true
  
  return false
}`;

  await expect(e2e(code, environment)).rejects.toHaveProperty(
    'name',
    'SyntaxError'
  );
});
