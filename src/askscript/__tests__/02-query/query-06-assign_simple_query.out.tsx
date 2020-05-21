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
        </query>
      }
    />
    <ref name={'result'} />
  </ask>
);
