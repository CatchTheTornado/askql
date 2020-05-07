import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { find } from '../find';

function ask(code: string) {
  return runUntyped({ resources: { ...core, find } }, parse(code));
}

test('find', () => {
  expect(ask('call(f(1),)')).toBe(1);
  expect(ask('[1, 2, 3, 4]')).toStrictEqual([1, 2, 3, 4]);
  expect(ask(`find([1, 2, 3, 4], f(is(get('$0'), 3)))`)).toBe(3);
});
