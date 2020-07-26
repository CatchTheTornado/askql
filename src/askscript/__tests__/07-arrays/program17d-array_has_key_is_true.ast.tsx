export = (
  <ask args={<list />}>
    <const
      name="countries"
      type={<ref name="any" />}
      value={
        <list>
          {"USA"}
          {"Spain"}
          {"Russia"}
        </list>
      }
    />
    <call
      name="hasKey"
      args={
        <list>
          <ref name="countries" />
          {0}
        </list>
      }
    />
  </ask>
);
