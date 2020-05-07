import { parse } from '../lib/parse';

test('parse', () => {
  expect(parse('f(g())')).toEqual({
    name: 'f',
    params: [
      {
        name: 'g',
        params: [],
      },
    ],
  });
});
