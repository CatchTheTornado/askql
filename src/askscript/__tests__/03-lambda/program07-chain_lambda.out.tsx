import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <fun name={'double'} args={[['s', 'string']]} returns={'string'}>
      <call name={'concat'} args={[<ref name={'s'} />, <ref name={'s'} />]} />
    </fun>
    <call
      name={'call'}
      args={[
        <ref name={'text'} />,
        <fun args={[['s', 'string']]} returns={'string'}>
          <call name={'double'} args={[<ref name={'s'} />]} />
        </fun>,
      ]}
    />
  </ask>
);
