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
                {4}
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
