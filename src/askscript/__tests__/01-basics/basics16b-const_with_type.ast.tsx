export = (
  <ask args={<list />}>
    <const name="a" type={<ref name="int" />} value={1} />
    <const name="b" type={<ref name="float" />} value={1.5} />
    <const
      name="c"
      type={<ref name="bool" />}
      value={<call name="false" args={<list />} />}
    />
    <const name="d" type={<ref name="string" />} value="asdf" />
    <const name="e" type={<ref name="any" />} value={2.3} />
  </ask>
);
