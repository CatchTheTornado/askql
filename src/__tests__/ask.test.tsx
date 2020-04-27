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
  expect(<return value={<string>OK</string>} />).toBe(
    c.returnUnsafe(c.string('OK'))
  );

  expect(
    <if condition={<ref id="a" />}>
      <return value={<string>OK</string>} />
    </if>
  ).toBe(c.if(c.ref('a'), { $then: [c.returnUnsafe(c.string('OK'))] }));

  expect(
    <call>
      <fun>
        <set id="test">
          <fun args={['a']}>
            <if condition={<ref id="a" />}>
              <return value={<string>OK</string>} />
            </if>
          </fun>
        </set>
        <call fun={<ref id="test" />} args={[<string>Y</string>]} />
      </fun>
    </call>
  ).toBe(
    c.call(
      c.fun(
        [],
        c.set(
          c.fun(
            ['a'],
            c.if(c.ref('a'), { $then: [c.returnUnsafe(c.string('OK'))] })
          ),
          'test'
        ),
        c.call(c.ref('test'), c.string('Y'))
      )
    )
  );

  expect(
    ask(
      <call>
        <fun>
          <set id="test">
            <fun args={['a']}>
              <if condition={<ref id="a" />}>
                <return value={<string>OK</string>} />
              </if>
            </fun>
          </set>
          <call fun={<ref id="test" />} args={[<string>Y</string>]} />
        </fun>
      </call>
    )
  ).toBe('OK');
});
