import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <set name={'x'} type={'any'} value={3} />
    <set name={'y'} type={'any'} value={-0.4} />
    <call
      name={'times'}
      args={[
        <call name={'+'} args={[<ref name={'x'} />, <ref name={'y'} />]} />,
        <call name={'-'} args={[<ref name={'x'} />, <ref name={'y'} />]} />,
      ]}
    />
  </ask>
);
