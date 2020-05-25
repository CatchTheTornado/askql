import program from './basics15c-let_without_value.ask';

test('sample', async () => {
  await expect(program([])).resolves.toBeDefined();
});
