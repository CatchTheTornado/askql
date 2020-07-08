export = (
  <ask args={<list />}>
    <call
      name="plus"
      args={
        <list>
          <ref name="a" />
          {3}
        </list>
      }
    />
  </ask>
);
