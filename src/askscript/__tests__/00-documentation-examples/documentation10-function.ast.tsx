export = (
  <ask args={<list />} returns={<ref name="string" />}>
    <if condition={<call name="checkThis" args={<list />} />} elseBlock={false}>
      <return value="your string" />
    </if>
    {"my string"}
  </ask>
);
