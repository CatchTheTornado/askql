import * as askjsx from '../askjsx';
import { ask } from './lib';
askjsx;

test('jsx', async () => {
  const sum = (
    <ask>
      <call
        name="times"
        args={[
          <ref name="n" />,
          <call
            name="factorial"
            args={[<call name="minus" args={[<ref name="n" />, 1]} />]}
          />,
        ]}
      />
    </ask>
  );
  console.log('SUM: ' + sum);
  await expect(ask(sum)).resolves.toBe(9);
});
