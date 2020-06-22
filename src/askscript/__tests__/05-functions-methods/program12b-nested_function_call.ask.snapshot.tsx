export = (
  <ask args={<list />}>
    <call
      name="factorial"
      args={
        <list>
          <call
            name="fun2"
            args={
              <list>
                <ref name="score" />
              </list>
            }
          />
        </list>
      }
    />
  </ask>
);
