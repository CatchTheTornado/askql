import { ask, c } from '..';

test('returns context', () => {
  const context = ask(c.ref('context'));
  expect(context).toHaveProperty('stack');
});

test('creates the basic function', () => {
  const f = c.funUnsafe(c.returnUnsafe(c.string('Hello world!')));
  expect(ask(f)).toBeInstanceOf(Function);
  expect(ask(c.call(f))).toBe('Hello world!');
});

test('creates function with arguments', () => {
  const f = c.fun(['a'], c.ref('a'));
  expect(ask(f)).toBeInstanceOf(Function);
  expect(ask(c.call(f, c.string('Hello world!')))).toBe('Hello world!');
});

test('closure', () => {
  const f = c.fun(
    [],
    c.set(c.string('a'), 'myvar'),
    c.call(c.fun([], c.set(c.string('b'), 'myvar'))),
    c.ref('myvar')
  );
  expect(ask(c.call(f))).toBe('a');
});

test('if', () => {
  const expr = (cond: string) =>
    c.if(cond, {
      $then: [c.string('yes')],
      $else: [c.string('no')],
    });
  expect(ask(expr(c.string('Y')))).toBe('yes');
  expect(ask(expr(c.string('')))).toBe('no');
});

test('jsx', () => {
  const call = (arg: string) =>
    c.render(
      <program>
        <fun name="test" args={['a']}>
          <if condition={<ref id="a" />}>
            <return value="OK" />
          </if>
          <else>
            <return value="NO" />
          </else>
        </fun>
        <call id="test" args={[arg]} />
      </program>
    );

  expect(ask(call('Y'))).toBe('OK');
  expect(ask(call(''))).toBe('NO');
});
