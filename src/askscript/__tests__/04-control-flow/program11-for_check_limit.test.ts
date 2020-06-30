import program from './program11-for_check_limit.ask';

test('computes', async () => {
  const maxArgUnderLimit = 587;
  await expect(program([maxArgUnderLimit])).resolves.toBe(maxArgUnderLimit);
  await expect(program([maxArgUnderLimit + 1])).rejects.toBe(
    'Error: Over steps limit!'
  );
});
