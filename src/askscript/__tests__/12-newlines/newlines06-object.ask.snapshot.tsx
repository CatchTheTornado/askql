export = (
  <ask args={<list />}>
    <let
      name="o"
      type={<ref name="any" />}
      value={
        <struct>
          {"name"}
          {"Arizona"}
          {"areaInSqMi"}
          {113998}
          {"westernState"}
          <call name="true" args={<list />} />
        </struct>
      }
    />
  </ask>
);
