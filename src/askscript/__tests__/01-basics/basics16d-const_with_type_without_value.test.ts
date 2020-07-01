import program from './basics16d-const_with_type_without_value.ask';

test('sample', async () => {
  await expect(program([])).resolves.toBe(null);
});
