import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <fun name={'factorial'} args={[['n', 'int']]} returns={'int'}>
      <if condition={<call name={'lessThan'} args={[<ref name={'n'} />, 2]} />}>
        <return value={<ref name={'n'} />} />
      </if>
      <call
        name={'times'}
        args={[
          <ref name={'n'} />,
          <call
            name={'factorial'}
            args={[<call name={'minus'} args={[<ref name={'n'} />, 1]} />]}
          />,
        ]}
      />
    </fun>
    <call name={'factorial'} args={[<ref name={'score'} />]} />
  </ask>
);
