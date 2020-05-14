import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <if condition={5} else={[<return value={<ref name={'no'} />} />]}>
      <return value={<ref name={'yes'} />} />
    </if>
  </ask>
);
