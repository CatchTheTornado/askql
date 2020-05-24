import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <fun name={'factorial'} args={[['n', 'int']]} returns={'int'}>
      <if condition={<call name={'lessThan'} args={[<ref name={'n'} />, 2]} />}>
        <return value={<ref name={'n'} />} />
      </if>
      <call
        name={'multiply'}
        args={[
          <ref name={'n'} />,
          <call
            name={'factorial'}
            args={[<call name={'minus'} args={[<ref name={'n'} />, 1]} />]}
          />,
        ]}
      />
    </fun>
    <fun
      name={'sum'}
      args={[
        ['a', 'int'],
        ['b', 'int'],
      ]}
      returns={'int'}
    >
      <call name={'plus'} args={[<ref name={'a'} />, <ref name={'b'} />]} />
    </fun>
    <const name={'one'} type={'int'} value={1} />
    <set name={'list'} type={'any'} value={[1, 2, 3]} />
    <call
      name={'sum'}
      args={[<ref name={'one'} />, <call name={'factorial'} args={[5]} />]}
    />
  </ask>
);
