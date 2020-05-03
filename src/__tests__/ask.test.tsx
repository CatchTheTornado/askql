import { ask, jsx } from '..';

test('returns context', () => {
  const context = ask(jsx.render(<jsx.Ref name="context" />));
  expect(context).toHaveProperty('stack');
});

test('creates the basic function', () => {
  const f = (
    <jsx.Fun>
      <v>Hello world!</v>
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
    ask(jsx.render(<jsx.Call args={[<v>Hello world!</v>]}>{f}</jsx.Call>))
  ).toBe('Hello world!');
});

test('closure', () => {
  expect(
    ask(
      jsx.render(
        <jsx.Call>
          <jsx.Fun>
            <jsx.Set name="myvar" value={<v>a</v>} />
            <jsx.Call>
              <jsx.Fun>
                <jsx.Set name="myvar" value={<v>b</v>} />
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
        <jsx.If condition={<v>{cond}</v>}>
          <v>yes</v>
        </jsx.If>
        <jsx.Else>
          <v>no</v>
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
            <jsx.Return value={<v>OK</v>} />
          </jsx.If>
          <jsx.Else>
            <jsx.Return value={<v>NO</v>} />
          </jsx.Else>
        </jsx.Fun>
        <jsx.Call name="test" args={[<v>{arg}</v>]} />
      </jsx.Ask>
    );

  expect(ask(call('Y'))).toBe('OK');
  expect(ask(call(''))).toBe('NO');
});

test('host concat', () => {
  const call = (...args: string[]) =>
    jsx.render(
      <jsx.Ask>
        <jsx.Call
          name="concat"
          args={args.map((arg) => (
            <v>{arg}</v>
          ))}
        />
      </jsx.Ask>
    );

  const resources = {
    concat({}, ...args: string[]): string {
      return ''.concat(...args);
    },
  };

  expect(ask(call('A', 'B', 'C'), { resources })).toBe('ABC');
});
