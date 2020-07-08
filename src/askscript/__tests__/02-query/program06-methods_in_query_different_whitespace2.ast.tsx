export = (
  <ask args={<list />}>
    <query>
      <node
        name="firstName"
        value={
          <call
            name="concat"
            args={
              <list>
                <call
                  name="toLowerCase"
                  args={
                    <list>
                      <ref name="firstName" />
                    </list>
                  }
                />{" "}
                {"is my "}
                {"name"}
              </list>
            }
          />
        }
      />
    </query>
  </ask>
);
