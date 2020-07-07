export = (
  <ask args={<list />} returns={<ref name="string" />}>
    <let name="a" type={<ref name="any" />} value={3} />
    <if
      condition={
        <call
          name="<"
          args={
            <list>
              <ref name="a" />
              {5}
            </list>
          }
          isOperator={true}
        />
      }
    >
      <return value="It works!" />
    </if>
    {"Ouch."}
  </ask>
);
