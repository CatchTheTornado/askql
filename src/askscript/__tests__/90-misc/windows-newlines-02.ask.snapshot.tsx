export = (
  <ask args={<list />}>
    <query>
      <node name="firstName" value={<ref name="firstName" />} />
      <node name="lastName" value={<ref name="lastName" />} />
      <node name="parents" value={<ref name="parents" />}>
        <node name="firstName" value={<ref name="firstName" />} />
        <node name="lastName" value={<ref name="lastName" />} />
      </node>
    </query>
  </ask>
);
