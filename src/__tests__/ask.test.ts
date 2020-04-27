import {
  $if,
  ask,
  call,
  fun,
  funUnsafe,
  ref,
  returnUnsafe,
  set,
  string,
} from '..';

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
  expect(ask(call(f, string('Hello world!')))).toBe('Hello world!');
});

test('closure', () => {
  const f = fun(
    [],
    set(string('a'), 'myvar'),
    call(fun([], set(string('b'), 'myvar'))),
    ref('myvar')
  );
  expect(ask(call(f))).toBe('a');
});

test('if', () => {
  const expr = (cond: string) =>
    $if(cond, {
      $then: [string('yes')],
      $else: [string('no')],
    });
  expect(ask(expr(string('Y')))).toBe('yes');
  expect(ask(expr(string('')))).toBe('no');
});
