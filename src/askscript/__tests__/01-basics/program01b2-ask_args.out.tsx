import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask
    args={[
      ['n', 'int'],
      ['thisIsFloat', 'float'],
      ['thisIsString', 'string'],
    ]}
  >
    <ref name={'thisIsFloat'} />
  </ask>
);
