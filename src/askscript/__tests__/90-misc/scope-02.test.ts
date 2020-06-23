import program from './scope-02.ask';

test('scope-02', async () => {
  await expect(program()).rejects.toBe(
    'Error: Cannot assign to an unknown variable "c"'
  );
});
