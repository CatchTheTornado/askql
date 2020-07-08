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
            name="multiply"
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
    <const
      name="sum"
      type={<ref name="any" />}
      value={
        <fun
          args={
            <list>
              <list>
                {"a"}
                <ref name="int" />
              </list>
              <list>
                {"b"}
                <ref name="int" />
              </list>
            </list>
          }
          returns={<ref name="int" />}
        >
          <call
            name="plus"
            args={
              <list>
                <ref name="a" />
                <ref name="b" />
              </list>
            }
          />
        </fun>
      }
    />
    <const name="one" type={<ref name="int" />} value={1} />
    <let
      name="list"
      type={<ref name="any" />}
      value={
        <list>
          {1}
          {2}
          {3}
        </list>
      }
    />
    <call
      name="sum"
      args={
        <list>
          <ref name="one" />
          <call name="factorial" args={<list>{5}</list>} />
        </list>
      }
    />
  </ask>
);
