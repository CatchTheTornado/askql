export = (
  <ask args={<list />}>
    <call
      name="plus"
      args={
        <list>
          <ref name="a" />
          {3}
          {"a"}
          {5.3}
        </list>
      }
    />
  </ask>
);
