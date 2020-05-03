import { ask, jsx } from '..';

test('returns context', () => {
  const context = ask(jsx.render(<ref name="context" />));
  expect(context).toHaveProperty('stack');
});

test('creates the basic function', () => {
  const f = (
    <fun>
      <v>Hello world!</v>
    </fun>
  );
  expect(ask(jsx.render(f))).toBeInstanceOf(Function);
  expect(ask(jsx.render(<call>{f}</call>))).toBe('Hello world!');
});

test('creates function with arguments', () => {
  const f = (
    <fun args={['a']}>
      <ref name="a" />
    </fun>
  );
  expect(ask(jsx.render(f))).toBeInstanceOf(Function);
  expect(ask(jsx.render(<call args={[<v>Hello world!</v>]}>{f}</call>))).toBe(
    'Hello world!'
  );
});

test('closure', () => {
  expect(
    ask(
      jsx.render(
        <call>
          <fun>
            <set name="myvar" value={<v>a</v>} />
            <call>
              <fun>
                <set name="myvar" value={<v>b</v>} />
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
    jsx.render(
      <fragment>
        <if condition={<v>{cond}</v>}>
          <v>yes</v>
        </if>
        <else>
          <v>no</v>
        </else>
      </fragment>
    );
  expect(ask(expr('Y'))).toBe('yes');
  expect(ask(expr(''))).toBe('no');
});

test('jsx', () => {
  const call = (arg: string) =>
    jsx.render(
      <ask>
        <fun name="test" args={['a']}>
          <if condition={<ref name="a" />}>
            <return value={<v>OK</v>} />
          </if>
          <else>
            <return value={<v>NO</v>} />
          </else>
        </fun>
        <call name="test" args={[<v>{arg}</v>]} />
      </ask>
    );

  expect(ask(call('Y'))).toBe('OK');
  expect(ask(call(''))).toBe('NO');
});

test('host concat', () => {
  const call = (...args: string[]) =>
    jsx.render(
      <ask>
        <call
          name="concat"
          args={args.map((arg) => (
            <v>{arg}</v>
          ))}
        />
      </ask>
    );

  const resources = {
    concat({}, ...args: string[]): string {
      return ''.concat(...args);
    },
  };

  expect(ask(call('A', 'B', 'C'), { resources })).toBe('ABC');
});
