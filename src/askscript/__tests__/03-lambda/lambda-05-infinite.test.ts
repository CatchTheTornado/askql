import program from './lambda-05-infinite.ask';

test('computes', async () => {
  await expect(program([])).rejects.toBe('Error: Over steps limit!');
});
