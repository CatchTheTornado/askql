export = (
  <ask
    args={
      <list>
        <list>
          {"n"}
          <ref name="int" />
        </list>
        <list>
          {"thisIsFloat"}
          <ref name="float" />
        </list>
        <list>
          {"thisIsString"}
          <ref name="string" />
        </list>
      </list>
    }
  >
    <ref name="thisIsFloat" />
  </ask>
);
