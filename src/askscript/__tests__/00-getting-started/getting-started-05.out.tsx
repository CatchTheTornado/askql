import * as askjsx from "../../../askjsx";

export const expectedOutput = (
  <ask>
    <query>
      <leaf name={'firstName'} value={<ref name={'firstName'} />} />
      <leaf name={'lastName'} value={<ref name={'lastName'} />} />
      <node name={'parents'}>
        <leaf name={'firstName'} value={<ref name={'firstName'} />} />
        <leaf name={'lastName'} value={<ref name={'lastName'} />} />
      </node>
    </query>
  </ask>
);
