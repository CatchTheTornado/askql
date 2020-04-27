import { ask, call, fun, funUnsafe, ref, returnUnsafe, string } from '..';

test('returns context', () => {
  const context = ask(ref('context'));
  expect(context).toHaveProperty('stack');
});

test('creates the basic function', () => {
  const f = funUnsafe(returnUnsafe(string('Hello world!')));
  expect(ask(f)).toBeInstanceOf(Function);
  expect(ask(call(f))).toBe('Hello world!');
});

test('creates function with arguments', () => {
  const f = fun(['a'], ref('a'));
  expect(ask(f)).toBeInstanceOf(Function);
  expect(ask(call(f, string('Hello world!')), { logging: true })).toBe(
    'Hello world!'
  );
});
