import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <query>
      <node name={'firstName'} value={<ref name={'firstName'} />} />
      <node name={'lastName'} value={<ref name={'lastName'} />} />
    </query>
  </ask>
);
