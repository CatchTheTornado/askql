import program from './program01e-ask_args_and_ret_type_any.ask';

test('program01e-ask_args_and_ret_type_any', async () => {
  await expect(program([0, 0, ''])).resolves.toBe(null);
});
