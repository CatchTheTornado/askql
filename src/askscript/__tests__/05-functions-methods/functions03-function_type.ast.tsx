export = (
  <ask args={<list />}>
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
    <call
      name="sum"
      args={
        <list>
          {2}
          {3}
        </list>
      }
    />
  </ask>
);
