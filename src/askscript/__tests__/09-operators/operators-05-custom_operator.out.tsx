import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask returns={'string'}>
    <set
      name={'<>'}
      type={'any'}
      value={
        <fun
          args={[
            ['a', 'float'],
            ['b', 'float'],
          ]}
          returns={'bool'}
        >
          <call
            name={'not'}
            args={[
              <call
                name={'equals'}
                args={[<ref name={'a'} />, <ref name={'b'} />]}
              />,
            ]}
          />
        </fun>
      }
    />
    <set name={'a'} type={'any'} value={3} />
    <if condition={<call name={'<>'} args={[<ref name={'a'} />, 5]} />}>
      <return value={'It works!'} />
    </if>
    Ouch.
  </ask>
);
