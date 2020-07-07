export = (
  <ask args={<list />}>
    <query>
      <node
        name="firstName"
        value={
          <call
            name="toUpperCase"
            args={
              <list>
                <ref name="firstName" />
              </list>
            }
          />
        }
      />
      <node
        name="lastName"
        value={
          <call
            name="concat"
            args={
              <list>
                <call
                  name="toLowerCase"
                  args={
                    <list>
                      <ref name="lastName" />
                    </list>
                  }
                />{" "}
                {"is my "}
                {"name; "}
                {
                  "lastName :: toLowerCase is a shorthand to: lastName : lastName:toLowerCase"
                }
              </list>
            }
          />
        }
      />
    </query>
  </ask>
);
