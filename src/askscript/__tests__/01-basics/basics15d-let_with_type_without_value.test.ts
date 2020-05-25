import program = require('./basics15d-let_with_type_without_value');

test('sample', async () => {
  await expect(program([])).resolves.toBeDefined();
});
