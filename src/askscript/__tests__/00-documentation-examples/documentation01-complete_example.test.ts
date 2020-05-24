import example = require('./documentation01-complete_example.ask');

test('documentation01-complete_example', async () => {
  await expect(example(5)).resolves.toBe('121');
});
