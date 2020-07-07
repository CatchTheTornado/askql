export = (
  <ask args={<list />}>
    <let name="a" type={<ref name="int" />} value={1} />
    <let name="b" type={<ref name="float" />} value={1.5} />
    <let
      name="c"
      type={<ref name="bool" />}
      value={<call name="false" args={<list />} />}
    />
  </ask>
);
