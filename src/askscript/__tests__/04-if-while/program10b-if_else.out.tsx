import * as askjsx from "../../../askjsx";

export const expectedOutput = (
  <ask>
    <if condition={5} else={<else>
        <return value={<ref name={'no'} />} />
      </else>}>
      <return value={<ref name={'yes'} />} />
    </if>
  </ask>
);
