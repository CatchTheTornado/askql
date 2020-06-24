export = (
  <ask args={<list />}>
    <let name="lastName" type={<ref name="string" />} value="Czerwinski" />
    <let name="hobby" type={<ref name="string" />} value="choir music" />
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
          {"hobby"}
          <call
            name="toUpperCase"
            args={
              <list>
                <ref name="hobby" />
              </list>
            }
          />
        </struct>
      }
    />
  </ask>
);
