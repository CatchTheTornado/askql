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
              {2}
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
              <return value="1A FAILED" />
            </list>
          }
        >
          <return value="1A PASSED" />
        </if>
      }
    >
      <return value="1A FAILED" />
    </if>
  </ask>
);
