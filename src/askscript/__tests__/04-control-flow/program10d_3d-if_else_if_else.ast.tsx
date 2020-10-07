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
                      {16}
                    </list>
                  }
                  isOperator={true}
                />
              }
              else={
                <list>
                  <return value="3DP" />
                </list>
              }
              elseBlock={true}
            >
              <return value="3DF" />
            </if>
          }
          elseBlock={false}
        >
          <return value="3DF" />
        </if>
      }
      elseBlock={false}
    >
      <return value="3DF" />
    </if>
  </ask>
);
