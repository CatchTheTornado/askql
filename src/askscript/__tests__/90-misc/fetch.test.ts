import program from './fetch.ask';

test('fetch', async () => {
  const json = await program();
  expect(json.id).toBe(1);
});
