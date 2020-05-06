import { parse } from '../askcode';
import { run } from '../askvm';

function vm(code: string) {
  return run(parse(code));
}

test('code2vm', () => {
  expect(vm('list("1", "2" ,"3")')).toStrictEqual(['1', '2', '3']);
  expect(vm('false')).toBe(false);
  expect(vm('2')).toBe(2);
  expect(vm('true')).toBe(true);
  expect(vm('get("false")')).toBe(false);
  expect(vm('get("true")')).toBe(true);
  expect(vm(`{ 'a': 1 }`)).toStrictEqual({ a: 1 });
  expect(vm(`call(fun(let('a', 5), a))`)).toStrictEqual(5);
  expect(vm('call(fun("1"))')).toBe('1');
  // function returned as AskCode
  expect(vm('fun("1",fun("2"))')).toHaveProperty('type');
});

test('types', () => {
  expect(vm('typed(2, string)')).toBe(2);
  // expect(() => vm('typed(string, 2)')).toThrow();
});
