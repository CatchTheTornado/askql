import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <query>
      <node name={'firstName'} value={<ref name={'firstName'} />} />
      <node name={'lastName'} value={<ref name={'lastName'} />} />
      <node name={'friends'}>
        <node name={'id'} value={<ref name={'id'} />} />
      </node>
    </query>
  </ask>
);
