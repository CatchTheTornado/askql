import * as askjsx from "../../../askjsx";

export const expectedOutput = (
  <ask>
    <fun name={'square'} args={[['a','int']]} returns={'int'}>
      <call name={'times'} args={[<ref name={'a'} />,<ref name={'a'} />]} />
      <if condition={<call name={'check'} args={[<ref name={'a'} />]} />}>
        <return value={2} />
      </if>
      <return value={<ref name={'a'} />} />
    </fun>
    <call name={'plus'} args={[<call name={'square'} args={[<ref name={'a'} />]} />,<call name={'square'} args={[<ref name={'a'} />]} />]} />
  </ask>
);
