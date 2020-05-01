import { ask, c } from '..';

test('returns context', () => {
  const context = ask(c.render(<ref name="context" />));
  expect(context).toHaveProperty('stack');
});

test('creates the basic function', () => {
  const f = <fun>Hello world!</fun>;
  expect(ask(c.render(f))).toBeInstanceOf(Function);
  expect(ask(c.render(<call>{f}</call>))).toBe('Hello world!');
});

test('creates function with arguments', () => {
  const f = (
    <fun args={['a']}>
      <ref name="a" />
    </fun>
  );
  expect(ask(c.render(f))).toBeInstanceOf(Function);
  expect(ask(c.render(<call args={['Hello world!']}>{f}</call>))).toBe(
    'Hello world!'
  );
});

test('closure', () => {
  expect(
    ask(
      c.render(
        <call>
          <fun>
            <set name="myvar" value="a" />
            <call>
              <fun>
                <set name="myvar" value="b" />
              </fun>
            </call>
            <ref name="myvar" />
          </fun>
        </call>
      )
    )
  ).toBe('a');
});

test('if', () => {
  const expr = (cond: string) =>
    c.render(
      <fragment>
        <if condition={cond}>yes</if>
        <else>no</else>
      </fragment>
    );
  expect(ask(expr('Y'))).toBe('yes');
  expect(ask(expr(''))).toBe('no');
});

test('jsx', () => {
  const call = (arg: string) =>
    c.render(
      <ask>
        <fun name="test" args={['a']}>
          <if condition={<ref name="a" />}>
            <return value="OK" />
          </if>
          <else>
            <return value="NO" />
          </else>
        </fun>
        <call name="test" args={[arg]} />
      </ask>
    );

  expect(ask(call('Y'))).toBe('OK');
  expect(ask(call(''))).toBe('NO');
});
