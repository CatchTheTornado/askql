import program from './program01b-ask_args.ask';

test('program01b-ask_args', async () => {
  await expect(program(0, 0, '')).resolves.toBe(null);
});
