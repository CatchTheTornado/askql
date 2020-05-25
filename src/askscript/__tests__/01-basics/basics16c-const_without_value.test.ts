import program from './basics16c-const_without_value.ask';

test('sample', async () => {
  await expect(program([])).resolves.toBeDefined();
});
