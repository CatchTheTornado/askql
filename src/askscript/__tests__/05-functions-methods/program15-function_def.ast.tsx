export = (
  <ask args={<list />}>
    <const
      name="square"
      type={<ref name="any" />}
      value={
        <fun
          args={
            <list>
              <list>
                {"a"}
                <ref name="int" />
              </list>
            </list>
          }
          returns={<ref name="int" />}
        >
          <call
            name="times"
            args={
              <list>
                <ref name="a" />
                <ref name="a" />
              </list>
            }
          />
        </fun>
      }
    />
    <call
      name="plus"
      args={
        <list>
          <call
            name="square"
            args={
              <list>
                <ref name="a" />
              </list>
            }
          />
          <call
            name="square"
            args={
              <list>
                <ref name="a" />
              </list>
            }
          />
        </list>
      }
    />
  </ask>
);
