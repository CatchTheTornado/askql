import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { find } from '../find';

const values = {
  clientNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  revPerClient: {
    A: 136,
    B: 426,
    C: 133,
    D: 35,
    E: 246,
    F: 446,
    G: 53,
  },
  test: 5,
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, find },
      values,
    },
    parse(code)
  );
}

test('find', () => {
  expect(ask('call(f(1),)')).toBe(1);
  expect(ask('[1, 2, 3, 4]')).toStrictEqual([1, 2, 3, 4]);
  expect(ask(`find([1, 2, 3, 4], f(is(get('$0'), 3)))`)).toBe(3);
  expect(ask(`test`)).toBe(5);
  expect(ask(`clientNames`)).toStrictEqual(values.clientNames);
  expect(ask(`revPerClient`)).toStrictEqual(values.revPerClient);
  expect(ask(`find(clientNames, f(is(get('$0'), 'A')))`)).toBe('A');
});
