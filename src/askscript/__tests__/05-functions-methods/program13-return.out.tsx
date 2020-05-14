import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    Hello world!
    <return value={<ref name={'n'} />} />
    <ref name={'hello'} />
  </ask>
);
