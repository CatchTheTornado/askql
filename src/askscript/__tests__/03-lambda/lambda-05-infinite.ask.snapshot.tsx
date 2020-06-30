export = (
  <ask args={<list />}>
    <const
      name="f"
      type={<ref name="any" />}
      value={
        <fun args={<list />} returns={<ref name="any" />}>
          <call
            name="call"
            args={
              <list>
                <ref name="f" />
              </list>
            }
          />
        </fun>
      }
    />
    <call
      name="call"
      args={
        <list>
          <ref name="f" />
        </list>
      }
    />
  </ask>
);
