export = (
  <ask args={<list />}>
    <const
      name="plus"
      type={<ref name="any" />}
      value={
        <fun
          args={
            <list>
              <list>
                {"a"}
                <ref name="any" />
              </list>
              <list>
                {"b"}
                <ref name="any" />
              </list>
              <list>
                {"c"}
                <ref name="any" />
              </list>
            </list>
          }
          returns={<ref name="float" />}
        >
          <return
            value={
              <call
                name="sum"
                args={
                  <list>
                    <call
                      name="sum"
                      args={
                        <list>
                          <ref name="a" />
                          <ref name="b" />
                        </list>
                      }
                    />
                    <ref name="c" />
                  </list>
                }
              />
            }
          />
        </fun>
      }
    />
    <call
      name="plus"
      args={
        <list>
          {2}
          {3.6}
          {4}
        </list>
      }
    />
  </ask>
);
