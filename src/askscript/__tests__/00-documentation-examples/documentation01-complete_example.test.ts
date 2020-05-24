import environment = require('./.environment');

declare var runUntyped: Function;
declare var source: string;

test('documentation01-complete_example', async () => {
  await expect(runUntyped(environment, source, [5])).resolves.toBe('121');
});
