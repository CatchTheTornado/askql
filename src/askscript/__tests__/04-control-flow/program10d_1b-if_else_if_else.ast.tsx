export = (
  <ask args={<list />}>
    <let name="len" type={<ref name="any" />} value={10} />
    <if
      condition={
        <call
          name="=="
          args={
            <list>
              <ref name="len" />
              {12}
            </list>
          }
          isOperator={true}
        />
      }
      else={
        <list>
          <return value="1BP" />
        </list>
      }
      elseBlock={true}
    >
      <return value="1BF" />
    </if>
  </ask>
);
