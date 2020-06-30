import program from './basics15d-let_with_type_without_value.ask';

test('sample', async () => {
  await expect(program([])).resolves.toBe(null);
});
