export = (
  <ask args={<list />}>
    <call
      name="factorial"
      args={
        <list>
          <ref name="score" />
        </list>
      }
    />
  </ask>
);
