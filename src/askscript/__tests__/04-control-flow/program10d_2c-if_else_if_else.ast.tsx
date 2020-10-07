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
                  {14}
                </list>
              }
              isOperator={true}
            />
          }
          else={
            <list>
              <return value="2CP" />
            </list>
          }
          elseBlock={true}
        >
          <return value="2CF" />
        </if>
      }
      elseBlock={false}
    >
      <return value="2CF" />
    </if>
  </ask>
);
