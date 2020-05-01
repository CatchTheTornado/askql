import { ask, jsx } from '..';

test('returns context', () => {
  const context = ask(jsx.render(<jsx.Ref name="context" />));
  expect(context).toHaveProperty('stack');
});

test('creates the basic function', () => {
  const f = <jsx.Fun>Hello world!</jsx.Fun>;
  expect(ask(jsx.render(f))).toBeInstanceOf(Function);
  expect(ask(jsx.render(<jsx.Call>{f}</jsx.Call>))).toBe('Hello world!');
});

test('creates function with arguments', () => {
  const f = (
    <jsx.Fun args={['a']}>
      <jsx.Ref name="a" />
    </jsx.Fun>
  );
  expect(ask(jsx.render(f))).toBeInstanceOf(Function);
  expect(
    ask(jsx.render(<jsx.Call args={['Hello world!']}>{f}</jsx.Call>))
  ).toBe('Hello world!');
});

test('closure', () => {
  expect(
    ask(
      jsx.render(
        <jsx.Call>
          <jsx.Fun>
            <jsx.Set name="myvar" value="a" />
            <jsx.Call>
              <jsx.Fun>
                <jsx.Set name="myvar" value="b" />
              </jsx.Fun>
            </jsx.Call>
            <jsx.Ref name="myvar" />
          </jsx.Fun>
        </jsx.Call>
      )
    )
  ).toBe('a');
});

test('if', () => {
  const expr = (cond: string) =>
    jsx.render(
      <jsx.Fragment>
        <jsx.If condition={cond}>yes</jsx.If>
        <jsx.Else>no</jsx.Else>
      </jsx.Fragment>
    );
  expect(ask(expr('Y'))).toBe('yes');
  expect(ask(expr(''))).toBe('no');
});

test('jsx', () => {
  const call = (arg: string) =>
    jsx.render(
      <jsx.Ask>
        <jsx.Fun name="test" args={['a']}>
          <jsx.If condition={<jsx.Ref name="a" />}>
            <jsx.Return value="OK" />
          </jsx.If>
          <jsx.Else>
            <jsx.Return value="NO" />
          </jsx.Else>
        </jsx.Fun>
        <jsx.Call name="test" args={[arg]} />
      </jsx.Ask>
    );

  expect(ask(call('Y'))).toBe('OK');
  expect(ask(call(''))).toBe('NO');
});
