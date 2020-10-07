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
        <if
          condition={
            <call
              name="=="
              args={
                <list>
                  <ref name="len" />
                  {10}
                </list>
              }
              isOperator={true}
            />
          }
          elseBlock={false}
        >
          <return value="0CP" />
        </if>
      }
      elseBlock={false}
    >
      <return value="0CF" />
    </if>
  </ask>
);
