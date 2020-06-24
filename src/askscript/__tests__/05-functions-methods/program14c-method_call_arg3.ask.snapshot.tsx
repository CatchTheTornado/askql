export = (
  <ask args={<list />}>
    <call
      name="plus"
      args={
        <list>
          <ref name="a" />
          {"a"}
        </list>
      }
    />
  </ask>
);
