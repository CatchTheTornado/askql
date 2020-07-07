export = (
  <ask args={<list />}>
    <let name="n" type={<ref name="any" />} value={4} />
    <call
      name="-"
      args={
        <list>
          <ref name="n" />
        </list>
      }
      isOperator={true}
      isUnaryOperator={true}
    />
  </ask>
);
