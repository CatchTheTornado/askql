export = (
  <ask args={<list />}>
    <call
      name="square"
      args={
        <list>
          <call
            name="+"
            args={
              <list>
                {3}
                {5}
              </list>
            }
            isOperator={true}
          />
        </list>
      }
    />
  </ask>
);
