export = (
  <ask args={<list />}>
    <while
      condition={
        <call
          name="lessThan"
          args={
            <list>
              <call name="rand" args={<list />} />
              {0.5}
            </list>
          }
        />
      }
    >
      <call name="doSomething" args={<list />} />
    </while>
  </ask>
);
