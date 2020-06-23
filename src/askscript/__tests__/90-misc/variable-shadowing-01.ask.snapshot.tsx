export = (
  <ask args={<list />}>
    <let name="b" type={<ref name="int" />} value={2} />
    <if condition={<call name="true" args={<list />} />}>
      <let name="b" type={<ref name="string" />} value="text" />
      <return value={<ref name="b" />} />
    </if>
    <return value={-1} />
  </ask>
);
