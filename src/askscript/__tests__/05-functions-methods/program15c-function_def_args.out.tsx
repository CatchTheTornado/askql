import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <fun
      name={'plus'}
      args={[
        ['a', 'int'],
        ['b', 'float'],
        ['c', 'int'],
      ]}
      returns={'float'}
    >
      <return
        value={
          <call
            name={'plus'}
            args={[
              <call
                name={'plus'}
                args={[<ref name={'a'} />, <ref name={'b'} />]}
              />,
              <ref name={'c'} />,
            ]}
          />
        }
      />
    </fun>
    <call name={'plus'} args={[2, 3.6, 4]} />
  </ask>
);
