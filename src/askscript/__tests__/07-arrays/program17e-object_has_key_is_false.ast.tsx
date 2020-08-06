export = (
  <ask args={<list />}>
    <const
      name="countries"
      type={<ref name="any" />}
      value={
        <struct>
          {"usa"}
          {"USA"}
          {"spain"}
          {"Spain"}
          {"russia"}
          {"Russia"}
        </struct>
      }
    />
    <const name="sweden" type={<ref name="any" />} value="Sweden" />
    <if
      condition={
        <call
          name="!"
          args={
            <list>
              <call
                name="hasKey"
                args={
                  <list>
                    <ref name="countries" />
                    <call
                      name="toLowerCase"
                      args={
                        <list>
                          <ref name="sweden" />
                        </list>
                      }
                    />
                  </list>
                }
              />
            </list>
          }
          isOperator={true}
          isUnaryOperator={true}
        />
      }
    >
      <return value="I would add sweden" />
    </if>
    {"No I would not"}
  </ask>
);
