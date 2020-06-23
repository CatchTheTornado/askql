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
          {"Germany"}
          {"Berlin"}
          {"Spain"}
          {"Madrid"}
        </struct>
      }
    />
    <let
      name="paris"
      type={<ref name="any" />}
      value={
        <call
          name="at"
          args={
            <list>
              <ref name="capitals" />
              {"France"}
            </list>
          }
        />
      }
    />
    <let
      name="berlin"
      type={<ref name="string" />}
      value={
        <call
          name="at"
          args={
            <list>
              <ref name="capitals" />
              {"Germany"}
            </list>
          }
        />
      }
    />
    <call
      name="at"
      args={
        <list>
          <ref name="capitals" />
          {"Spain"}
        </list>
      }
    />
  </ask>
);
