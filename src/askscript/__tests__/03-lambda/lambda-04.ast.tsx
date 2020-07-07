export = (
  <ask args={<list />}>
    <call
      name="call"
      args={
        <list>
          <call name="get" args={<list>{"toString"}</list>} />
          {2}
        </list>
      }
    />
  </ask>
);
