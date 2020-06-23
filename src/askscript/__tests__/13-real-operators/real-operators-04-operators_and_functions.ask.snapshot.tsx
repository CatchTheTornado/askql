export = (
  <ask args={<list />}>
    <let name="x" type={<ref name="any" />} value={3} />
    <let name="y" type={<ref name="any" />} value={-0.4} />
    <call
      name="times"
      args={
        <list>
          <call
            name="+"
            args={
              <list>
                <ref name="x" />
                <ref name="y" />
              </list>
            }
            isOperator={true}
          />
          <call
            name="-"
            args={
              <list>
                <ref name="x" />
                <ref name="y" />
              </list>
            }
            isOperator={true}
          />
        </list>
      }
    />
  </ask>
);
