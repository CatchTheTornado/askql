import program from './program11-while_infinite.ask';

test('computes', async () => {
  await expect(program([])).rejects.toBe('Error: Over steps limit!');
});
