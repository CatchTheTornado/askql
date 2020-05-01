import { ask, jsx } from '..';

test('returns context', () => {
  const context = ask(jsx.render(<jsx.Ref name="context" />));
  expect(context).toHaveProperty('stack');
});

test('creates the basic function', () => {
  const f = (
    <jsx.Fun>
      <string>Hello world!</string>
    </jsx.Fun>
  );
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
    ask(
      jsx.render(
        <jsx.Call args={[<string>Hello world!</string>]}>{f}</jsx.Call>
      )
    )
  ).toBe('Hello world!');
});

test('closure', () => {
  expect(
    ask(
      jsx.render(
        <jsx.Call>
          <jsx.Fun>
            <jsx.Set name="myvar" value={<string>a</string>} />
            <jsx.Call>
              <jsx.Fun>
                <jsx.Set name="myvar" value={<string>b</string>} />
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
      <fragment>
        <jsx.If condition={<string>{cond}</string>}>
          <string>yes</string>
        </jsx.If>
        <jsx.Else>
          <string>no</string>
        </jsx.Else>
      </fragment>
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
            <jsx.Return value={<string>OK</string>} />
          </jsx.If>
          <jsx.Else>
            <jsx.Return value={<string>NO</string>} />
          </jsx.Else>
        </jsx.Fun>
        <jsx.Call name="test" args={[<string>{arg}</string>]} />
      </jsx.Ask>
    );

  expect(ask(call('Y'))).toBe('OK');
  expect(ask(call(''))).toBe('NO');
});
