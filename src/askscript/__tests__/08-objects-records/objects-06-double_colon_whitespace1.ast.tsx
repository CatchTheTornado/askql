export = (
  <ask args={<list />}>
    <let name="lastName" type={<ref name="string" />} value="Czerwinski" />
    <let
      name="o"
      type={<ref name="any" />}
      value={
        <struct>
          {"firstName"}
          <call
            name="toLowerCase"
            args={
              <list>
                <ref name="firstName" />
              </list>
            }
          />
          {"lastName"}
          <call
            name="toUpperCase"
            args={
              <list>
                <ref name="lastName" />
              </list>
            }
          />
        </struct>
      }
    />
  </ask>
);
