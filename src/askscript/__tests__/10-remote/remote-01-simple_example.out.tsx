import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <call
      name={'remote'}
      args={[
        '/',
        <fun args={[]} returns={'any'}>
          <ref name={'hello'} />
        </fun>,
      ]}
    />
  </ask>
);
