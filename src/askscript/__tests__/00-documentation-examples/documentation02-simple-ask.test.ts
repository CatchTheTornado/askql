import program from './documentation02-simple-ask.ask';

test('documentation02-simple-ask', async () => {
  await expect(program(0, '')).resolves.toBe(null);
});
