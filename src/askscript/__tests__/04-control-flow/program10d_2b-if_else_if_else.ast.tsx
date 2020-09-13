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
          else={
            <list>
              <return value="2BF" />
            </list>
          }
          elseType={true}
        >
          <return value="2BP" />
        </if>
      }
      elseType={false}
    >
      <return value="2BF" />
    </if>
  </ask>
);
