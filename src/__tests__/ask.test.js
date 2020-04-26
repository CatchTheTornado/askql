import { ask, ref, string } from '..';

test('returns context', () => {
  const context = ask(ref(string('context')), {
    logging: true,
  });
  expect(context).toHaveProperty('context', context);
});
