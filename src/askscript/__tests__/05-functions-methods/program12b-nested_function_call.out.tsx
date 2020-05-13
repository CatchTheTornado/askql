import * as askjsx from "../../../askjsx";

export const expectedOutput = (
  <ask>
    <call name={'factorial'} args={[<call name={'fun2'} args={[<ref name={'score'} />]} />]} />
  </ask>
);
