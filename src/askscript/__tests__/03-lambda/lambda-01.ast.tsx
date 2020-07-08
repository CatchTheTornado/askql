export = (
  <ask args={<list />}>
    <call
      name="call"
      args={
        <list>
          <fun args={<list />} returns={<ref name="any" />}>
            {5}
          </fun>
        </list>
      }
    />
  </ask>
);
