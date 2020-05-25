import program = require('./basics15c-let_without_value');

test('sample', async () => {
  await expect(program([])).resolves.toBeDefined();
});
