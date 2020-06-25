export = (
  <ask args={<list />}>
    <let name="i" type={<ref name="int" />} value={12} />
    <assign name="i" value={98} />
    <let name="s" type={<ref name="string" />} value="hello" />
    <assign name="s" value="bye" />
    <const name="f" type={<ref name="float" />} value={1.2} />
    <let name="b" type={<ref name="any" />} value="sdf" />
    <assign name="b" value={3} />
    <const name="a" type={<ref name="any" />} value="asdf" />
  </ask>
);
