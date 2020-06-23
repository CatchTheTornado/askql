export = (
  <ask args={<list />}>
    <let name="a" type={<ref name="any" />} value={1} />
    <call
      name="+"
      args={
        <list>
          <ref name="a" />
          <ref name="bFromEnv" />
        </list>
      }
      isOperator={true}
    />
  </ask>
);
