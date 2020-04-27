import { ask, call, fun, funUnsafe, ref, string } from '..';

test('returns context', () => {
  const context = ask(ref('context'));
  expect(context).toHaveProperty('stack');
});

test('creates the basic function', () => {
  const f = funUnsafe(string('Hello world!'));
  expect(ask(f)).toBeInstanceOf(Function);
  expect(ask(call(f))).toBe('Hello world!');
});

test('creates function with arguments', () => {
  const f = fun(ref('a'), 'a');
  expect(ask(f)).toBeInstanceOf(Function);
  expect(ask(call(f, string('Hello world!')))).toBe('Hello world!');
});
