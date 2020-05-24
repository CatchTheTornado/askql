import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask returns={'float'}>
    <call
      name={'fun1'}
      args={[
        <call name={'fun2'} args={[<call name={'fun3'} args={[2.4]} />]} />,
      ]}
    />
  </ask>
);
