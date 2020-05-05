import { parse } from '../lib/parse';

test('parse', () => {
  expect(parse('f(g())')).toStrictEqual({
    type: 'f',
    children: [
      {
        type: 'g',
        children: [],
      },
    ],
  });
});
