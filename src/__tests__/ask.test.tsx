import { askjsx } from '..';
import { AskCode } from '../askcode';
import { ask } from './lib';
askjsx;

test('returns true', async () => {
  const context = ask(<ref name="true" />);
  await expect(context).resolves.toBe(true);
});

test('creates the basic function', async () => {
  const f = <fun>Hello world!</fun>;
  expect(f).toBeInstanceOf(AskCode);
  await expect(ask(f, [])).resolves.toBe('Hello world!');
});

test('creates function with arguments', async () => {
  const f = (
    <fun args={['a']}>
      <ref name="a" />
    </fun>
  );
  expect(f).toBeInstanceOf(AskCode);
  await expect(ask(<call args={['Hello world!']}>{f}</call>)).resolves.toBe(
    'Hello world!'
  );
});

test('closure', async () => {
  await expect(
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
  ).resolves.toBe('a');
});

test('if', async () => {
  const expr = (cond: string) => (
    <ask>
      <if condition={cond} else="no">
        yes
      </if>
    </ask>
  );
  await expect(ask(expr('Y'))).resolves.toBe('yes');
  await expect(ask(expr(''))).resolves.toBe('no');
});

test('return', async () => {
  await expect(
    ask(
      <ask>
        <return value="5" />6
      </ask>
    )
  ).resolves.toBe('5');
});

test('if and return', async () => {
  const code = (
    <if
      condition="4"
      then={<return value="YES" />}
      else={<return value="NO" />}
    />
  );
  await expect(ask(code)).resolves.toBe('YES');
});

test('jsx', async () => {
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
  await expect(ask(call('Y'))).resolves.toBe('YES');
  await expect(ask(call(''))).resolves.toBe('NO');
});

test('multival', async () => {
  await expect(ask([1, 2, 3] as any)).resolves.toStrictEqual([1, 2, 3]);
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
