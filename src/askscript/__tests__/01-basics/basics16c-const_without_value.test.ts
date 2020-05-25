import program = require('./basics16c-const_without_value');

test('sample', async () => {
  await expect(program([])).resolves.toBeDefined();
});
