export = (
  <ask args={<list />}>
    <const
      name="result"
      type={<ref name="any" />}
      value={
        <query>
          <node name="firstName" value={<ref name="firstName" />} />
          <node name="lastName" value={<ref name="lastName" />} />
        </query>
      }
    />
    <ref name="result" />
  </ask>
);
