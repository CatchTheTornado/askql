export = (
  <ask args={<list />}>
    <query>
      <node name="firstName" value={<ref name="firstName" />} />
      <node name="lastName" value={<ref name="lastName" />} />
    </query>
  </ask>
);
