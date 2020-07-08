export = (
  <ask args={<list />}>
    <query>
      <node name="firstName" value={<ref name="firstName" />} />
      <node name="lastName" value={<ref name="lastName" />} />
      <node name="friends" value={<ref name="friends" />}>
        <node name="id" value={<ref name="id" />} />
      </node>
    </query>
  </ask>
);
