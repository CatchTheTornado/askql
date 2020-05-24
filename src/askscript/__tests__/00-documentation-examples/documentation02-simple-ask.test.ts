import environment = require('./.environment');

declare var runUntyped: Function;
declare var source: string;

test('documentation02-simple-ask', async () => {
  await expect(runUntyped(environment, source, [0, ''])).resolves.toBe(null);
});
