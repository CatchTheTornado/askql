export = (
  <ask args={<list />} returns={<ref name="float" />}>
    <call
      name="fun1"
      args={
        <list>
          <call
            name="fun2"
            args={
              <list>
                <call name="fun3" args={<list>{2.4}</list>} />
              </list>
            }
          />
        </list>
      }
    />
  </ask>
);
