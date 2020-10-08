export = (
  <ask args={<list />}>
    <call
      name="objectExtend"
      args={
        <list>
          <struct>
            {"one"}
            {1}
          </struct>
          <struct>
            {"two"}
            {2}
          </struct>
        </list>
      }
    />
  </ask>
);
