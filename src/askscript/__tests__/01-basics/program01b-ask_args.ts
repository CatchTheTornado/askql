import program from './program01b-ask_args.ask';

test('program01b-ask_args', async () => {
  // Fix in https://github.com/xFAANG/askql/issues/46
  // await expect(program([0, 0, ''])).resolves.toBe(null);
  await expect(program([0, 0, ''])).rejects.toBe(
    "Error: Unknown identifier '$1'!"
  );
});
