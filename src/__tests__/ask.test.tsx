import { askjsx } from '..';
import { AskCode } from '../askcode';
import { ask } from './lib';
askjsx;

test('returns true', () => {
  const context = ask(<ref name="true" />);
  expect(context).toBe(true);
});

test('creates the basic function', () => {
  const f = <fun>Hello world!</fun>;
  expect(f).toBeInstanceOf(AskCode);
  expect(ask(f, [])).toBe('Hello world!');
});

test('creates function with arguments', () => {
  const f = (
    <fun args={['a']}>
      <ref name="a" />
    </fun>
  );
  expect(f).toBeInstanceOf(AskCode);
  expect(ask(<call args={['Hello world!']}>{f}</call>)).toBe('Hello world!');
});

test('closure', () => {
  expect(
    ask(
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
  ).toBe('a');
});

test('if', () => {
  const expr = (cond: string) => (
    <ask>
      <if condition={cond} else="no">
        yes
      </if>
    </ask>
  );
  expect(ask(expr('Y'))).toBe('yes');
  expect(ask(expr(''))).toBe('no');
});

test('return', () => {
  expect(
    ask(
      <ask>
        <return value="5" />6
      </ask>
    )
  ).toBe('5');
});

test('if and return', () => {
  const code = (
    <if
      condition="4"
      then={<return value="YES" />}
      else={<return value="NO" />}
    />
  );
  expect(ask(code)).toBe('YES');
});

test('jsx', () => {
  const call = (arg: string) => (
    <ask>
      <fun name="test" args={['a']}>
        <if
          condition={<ref name="a" />}
          then={<return value={<v>YES</v>} />}
          else={<return value={<v>NO</v>} />}
        />
      </fun>
      <call name="test" args={[<v>{arg}</v>]} />
    </ask>
  );
  expect(ask(call('Y'))).toBe('YES');
  expect(ask(call(''))).toBe('NO');
});

test('multival', () => {
  expect(ask([1, 2, 3] as any)).toStrictEqual([1, 2, 3]);
});

// test('host concat', () => {
//   const call = (...args: string[]) =>
//     jsx.render(
//       <ask>
//         <call
//           name="concat"
//           args={args.map((arg) => (
//             <v>{arg}</v>
//           ))}
//         />
//       </ask>
//     );

//   const resources = {
//     concat({}, ...args: string[]): string {
//       return ''.concat(...args);
//     },
//   };

//   expect(ask(call('A', 'B', 'C'), { resources })).toBe('ABC');
// });
