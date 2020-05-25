import program = require('./basics16d-const_with_type_without_value');

test('sample', async () => {
  await expect(program([])).resolves.toBeDefined();
});
