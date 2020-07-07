export = (
  <ask args={<list />}>
    <const
      name="result"
      type={<ref name="any" />}
      value={
        <query>
          <node name="firstField" value={<ref name="middleName" />} />
          <node
            name="secondField"
            value={
              <call
                name="fun2"
                args={
                  <list>
                    {34}
                    {"adfs"}
                    <list />
                  </list>
                }
              />
            }
          />
          <node
            name="thirdField"
            value={
              <call
                name="fun3"
                args={
                  <list>
                    <call
                      name="fun2"
                      args={
                        <list>
                          {34}
                          {"adfs"}
                          <list />
                        </list>
                      }
                    />
                  </list>
                }
              />
            }
          />
          <node
            name="upperCaseFullName"
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
      }
    />
    <ref name="result" />
  </ask>
);
