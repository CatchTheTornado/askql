import { parse } from '../askcode';
import { run } from '../askvm';

function vm(code: string) {
  return run(parse(code));
}

test('code2vm', () => {
  expect(vm('list("1", "2" ,"3")')).toStrictEqual(['1', '2', '3']);
  expect(vm('false')).toBe(false);
  expect(vm('true')).toBe(true);
  // expect(vm('fun("1",fun("2"))')).toBe(true);
  expect(vm('call(fun("1"))')).toBe('1');
});
