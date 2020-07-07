export = (
  <ask args={<list />}>
    <const
      name="result"
      type={<ref name="any" />}
      value={
        <query>
          <node name="firstName" value={<ref name="firstName" />} />
          <node name="lastName" value={<ref name="lastName" />} />
          <node name="friends" value={<ref name="friends" />}>
            <node name="id" value={<ref name="id" />} />
          </node>
        </query>
      }
    />
    <ref name="result" />
  </ask>
);
