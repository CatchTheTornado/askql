import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <fun name={'three'} args={[]} returns={'int'}>
      <return value={3} />
    </fun>
    <call name={'three'} args={[]} />
  </ask>
);
