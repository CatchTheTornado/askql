import { resources } from '../../../askvm';
import { e2e } from '../../../utils/tools';

test('div', async () => {
  const environment = { resources };
  expect(await e2e('7:div(5)', environment)).toBe(1);
  expect(await e2e('5:div(5)', environment)).toBe(1);
  expect(await e2e('5.01:div(5)', environment)).toBe(1);
  expect(await e2e('4:div(5)', environment)).toBe(0);
  expect(await e2e('-2:div(-3)', environment)).toBe(0);
  expect(await e2e('-4:div(-3)', environment)).toBe(1);
});
