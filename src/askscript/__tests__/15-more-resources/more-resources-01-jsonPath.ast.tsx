export = (
  <ask args={<list />}>
    <let
      name="revPerClient"
      type={<ref name="any" />}
      value={
        <struct>
          {"A"}
          {136}
          {"B"}
          {426}
          {"C"}
          {133}
          {"D"}
          {35}
          {"E"}
          {246}
          {"F"}
          {446}
          {"G"}
          {53}
        </struct>
      }
    />
    <call
      name="jsonPath"
      args={
        <list>
          <ref name="revPerClient" />
          {"$.A"}
        </list>
      }
    />
  </ask>
);
