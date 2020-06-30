export = (
  <ask args={<list />}>
    <const
      name="double"
      type={<ref name="any" />}
      value={
        <fun
          args={
            <list>
              <list>
                {"s"}
                <ref name="string" />
              </list>
            </list>
          }
          returns={<ref name="string" />}
        >
          <call
            name="concat"
            args={
              <list>
                <ref name="s" />
                <ref name="s" />
              </list>
            }
          />
        </fun>
      }
    />
    <call
      name="useFor"
      args={
        <list>
          <ref name="text" />
          <fun
            args={
              <list>
                <list>
                  {"s"}
                  <ref name="string" />
                </list>
              </list>
            }
            returns={<ref name="string" />}
          >
            <call
              name="double"
              args={
                <list>
                  <ref name="s" />
                </list>
              }
            />
          </fun>
        </list>
      }
    />
  </ask>
);
