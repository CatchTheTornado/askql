import * as askjsx from "../../../askjsx";

export const expectedOutput = (
  <ask>
    Hello world!
    <return value={<value type={'empty'} value={'null'} />} />
    <ref name={'hello'} />
  </ask>
);
