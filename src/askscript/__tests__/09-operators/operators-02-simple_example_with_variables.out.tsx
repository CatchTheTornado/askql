import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <set name={'a'} type={'any'} value={1} />
    <call name={'+'} args={[<ref name={'a'} />, <ref name={'bFromEnv'} />]} />
  </ask>
);
