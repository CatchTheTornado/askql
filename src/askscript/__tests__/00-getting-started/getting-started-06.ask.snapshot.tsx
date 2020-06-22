export = (
  <ask args={<list />}>
    <query>
      <node
        name="fullName"
        value={
          <call
            name="toUpperCase"
            args={
              <list>
                <call
                  name="concat"
                  args={
                    <list>
                      <ref name="firstName" /> <ref name="lastName" />
                    </list>
                  }
                />
              </list>
            }
          />
        }
      />
    </query>
  </ask>
);
