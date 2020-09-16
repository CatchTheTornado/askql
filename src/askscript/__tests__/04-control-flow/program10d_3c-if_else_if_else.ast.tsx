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
                  <return value="3CF" />
                </list>
              }
              elseBlock={true}
            >
              <return value="3CP" />
            </if>
          }
          elseBlock={false}
        >
          <return value="3CF" />
        </if>
      }
      elseBlock={false}
    >
      <return value="3CF" />
    </if>
  </ask>
);
