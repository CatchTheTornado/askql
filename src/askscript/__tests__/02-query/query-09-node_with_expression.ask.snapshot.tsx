export = (
  <ask args={<list />}>
    <query>
      <node
        name="friends"
        value={
          <call
            name="where"
            args={
              <list>
                <call
                  name="knex"
                  args={
                    <list>
                      <ref name="friends" />
                    </list>
                  }
                />
                <struct>
                  {"email"}
                  {"hi@example.com"}
                </struct>
              </list>
            }
          />
        }
      >
        <node name="firstName" value={<ref name="firstName" />} />
        <node name="lastName" value={<ref name="lastName" />} />
      </node>
    </query>
  </ask>
);
