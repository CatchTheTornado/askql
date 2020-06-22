export = (
  <ask args={<list />}>
    <let
      name="myFun"
      type={<ref name="any" />}
      value={
        <fun args={<list />} returns={<ref name="any" />}>
          <ref name="$0" />
        </fun>
      }
    />
  </ask>
);
