export = (
  <ask args={<list />}>
    <let name="a" type={<ref name="int" />} value={1} />
    <let name="b" type={<ref name="float" />} value={1.5} />
    <let
      name="c"
      type={<ref name="bool" />}
      value={<call name="false" args={<list />} />}
    />
    <let name="d" type={<ref name="string" />} value="asdf" />
    <let
      name="e"
      type={<ref name="empty" />}
      value={<call name="null" args={<list />} />}
    />
    <let name="f" type={<ref name="any" />} value={2.3} />
  </ask>
);
