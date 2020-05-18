import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <fun name={'sum'} args={[['a','int'],['b','int']]} returns={'int'}>
      <call name={'plus'} args={[<ref name={'a'} />,<ref name={'b'} />]} />
    </fun>
    <call name={'sum'} args={[2,3]} />
  </ask>
);
