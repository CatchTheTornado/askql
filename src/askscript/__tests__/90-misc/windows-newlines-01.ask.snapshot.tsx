export = (
  <ask
    args={
      <list>
        <list>
          {"arg1"}
          <ref name="int" />
        </list>
      </list>
    }
    returns={<ref name="string" />}
  >
    <const
      name="factorial"
      type={
        <call
          name="int"
          args={
            <list>
              <ref name="int" />
            </list>
          }
        />
      }
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
      type={
        <call
          name="int"
          args={
            <list>
              <ref name="int" />
              <ref name="int" />
            </list>
          }
        />
      }
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
    <call
      name="toString"
      args={
        <list>
          <call
            name="sum"
            args={
              <list>
                <ref name="one" />
                <call
                  name="factorial"
                  args={
                    <list>
                      <ref name="arg1" />
                    </list>
                  }
                />
              </list>
            }
          />
        </list>
      }
    />
  </ask>
);
