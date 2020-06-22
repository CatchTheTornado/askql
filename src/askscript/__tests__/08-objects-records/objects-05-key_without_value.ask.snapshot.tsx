export = (
  <ask args={<list />}>
    <let name="lastName" type={<ref name="string" />} value="Czerwinski" />
    <let
      name="o"
      type={<ref name="any" />}
      value={
        <struct>
          {"firstName"}
          <ref name="firstName" />
          {"lastName"}
          <ref name="lastName" />
        </struct>
      }
    />
  </ask>
);
