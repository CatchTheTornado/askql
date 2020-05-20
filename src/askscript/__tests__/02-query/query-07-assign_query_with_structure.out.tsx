import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <const
      name={'result'}
      type={'any'}
      value={
        <query>
          <leaf name={'firstName'} value={<ref name={'firstName'} />} />
          <leaf name={'lastName'} value={<ref name={'lastName'} />} />
          <node name={'friends'}>
            <leaf name={'id'} value={<ref name={'id'} />} />
          </node>
        </query>
      }
    />
    <ref name={'result'} />
  </ask>
);
