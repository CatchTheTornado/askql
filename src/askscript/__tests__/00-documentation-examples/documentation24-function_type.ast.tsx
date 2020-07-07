export = (
  <ask args={<list />}>
    <const
      name="f"
      type={
        <call
          name="string"
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
          returns={<ref name="string" />}
        >
          {""}
        </fun>
      }
    />
  </ask>
);
