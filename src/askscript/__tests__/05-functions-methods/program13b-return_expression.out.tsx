import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    Hello world!
    <return value={<call name={'plus'} args={[<ref name={'n'} />, 1]} />} />
    <ref name={'hello'} />
  </ask>
);
