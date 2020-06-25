export = (
  <ask args={<list />}>
    <let name="b" type={<ref name="int" />} value={2} />
    <if condition={<call name="true" args={<list />} />}>
      <assign name="b" value={4} />
    </if>
    <ref name="b" />
  </ask>
);
