export = (
  <ask args={<list />}>
    <const
      name="factorial"
      type={<ref name="any" />}
      value={
        <fun
          args={
            <list>
              <list>
                {"n"}
                <ref name="int" />
              </list>
            </list>
          }
          returns={<ref name="int" />}
        >
          <if
            condition={
              <call
                name="lessThan"
                args={
                  <list>
                    <ref name="n" />
                    {2}
                  </list>
                }
              />
            }
          >
            <return value={<ref name="n" />} />
          </if>
          <call
            name="times"
            args={
              <list>
                <ref name="n" />
                <call
                  name="factorial"
                  args={
                    <list>
                      <call
                        name="minus"
                        args={
                          <list>
                            <ref name="n" />
                            {1}
                          </list>
                        }
                      />
                    </list>
                  }
                />
              </list>
            }
          />
        </fun>
      }
    />
    <call
      name="factorial"
      args={
        <list>
          <ref name="score" />
        </list>
      }
    />
  </ask>
);
