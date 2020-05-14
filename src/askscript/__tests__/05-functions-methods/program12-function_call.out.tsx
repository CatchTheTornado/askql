import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <call name={'factorial'} args={[<ref name={'score'} />]} />
  </ask>
);
