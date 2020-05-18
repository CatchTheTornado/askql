import * as askjsx from '..';
import { toAskCode } from '../../askcode';
askjsx;

test('jsx', () => {
  const sum = <call name="sum" args={[4, 5]} />;
  expect(sum).toStrictEqual(
    toAskCode({
      name: 'call',
      params: [toAskCode({ name: 'get', params: ['sum'] }), 4, 5],
    })
  );
});
