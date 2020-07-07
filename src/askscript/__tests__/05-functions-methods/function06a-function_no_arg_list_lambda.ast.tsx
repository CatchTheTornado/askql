export = (
  <ask args={<list />}>
    <const
      name="arr"
      type={<ref name="any" />}
      value={
        <list>
          {1}
          {2}
          {3}
          {4}
        </list>
      }
    />
    <call
      name="map"
      args={
        <list>
          <ref name="arr" />
          <fun args={<list />} returns={<ref name="any" />}>
            {7}
          </fun>
        </list>
      }
    />
  </ask>
);
