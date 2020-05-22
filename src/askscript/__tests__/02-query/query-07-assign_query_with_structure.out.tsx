import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <const
      name={'result'}
      type={'any'}
      value={
        <query>
          <node name={'firstName'} value={<ref name={'firstName'} />} />
          <node name={'lastName'} value={<ref name={'lastName'} />} />
          <node name={'friends'}>
            <node name={'id'} value={<ref name={'id'} />} />
          </node>
        </query>
      }
    />
    <ref name={'result'} />
  </ask>
);
