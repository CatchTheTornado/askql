export = (
  <ask args={<list />}>
    <let
      name="capitals"
      type={
        <call
          name="map"
          args={
            <list>
              <ref name="string" />
            </list>
          }
        />
      }
      value={
        <struct>
          {"France"}
          {"Paris"}
          {"france"}
          {"paris"}
        </struct>
      }
    />
  </ask>
);
