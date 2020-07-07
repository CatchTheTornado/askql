export = (
  <ask args={<list />}>
    <let
      name="o"
      type={<ref name="any" />}
      value={
        <struct>
          {"name"}
          {"Arizona"}
          {"numbers"}
          <list>
            {113998}
            {2020}
          </list>
        </struct>
      }
    />
  </ask>
);
