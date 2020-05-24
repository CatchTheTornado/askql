import environment = require('./.environment');

test('documentation02-simple-ask', async () => {
  await expect(runUntyped(environment, source, [0, ''])).resolves.toBe(null);
});
