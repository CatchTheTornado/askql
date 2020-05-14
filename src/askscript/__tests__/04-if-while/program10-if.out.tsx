import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <if condition={<call name={'lessThan'} args={[<ref name={'n'} />, 2]} />}>
      <return value={<ref name={'a'} />} />
    </if>
    <return value={<ref name={'b'} />} />
  </ask>
);
