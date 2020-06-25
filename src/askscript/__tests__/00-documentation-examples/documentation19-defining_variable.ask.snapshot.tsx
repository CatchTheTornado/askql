export = (
  <ask args={<list />}>
    <let name="i" type={<ref name="int" />} value={12} />
    <let name="s" type={<ref name="string" />} value="hello" />
    <const name="f" type={<ref name="float" />} value={1.2} />
    <let name="b" type={<ref name="any" />} value="sdf" />
    <const name="a" type={<ref name="any" />} value="asdf" />
  </ask>
);
