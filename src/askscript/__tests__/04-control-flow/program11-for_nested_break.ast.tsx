export = (
  <ask args={<list />}>
    <let name="result" type={<ref name="any" />} value="" />
    <for
      initialization={<let name="i" type={<ref name="any" />} value={0} />}
      condition={
        <call
          name="<"
          args={
            <list>
              <ref name="i" />
              {2}
            </list>
          }
          isOperator={true}
        />
      }
      finalExpression={
        <assign
          name="i"
          value={
            <call
              name="+"
              args={
                <list>
                  <ref name="i" />
                  {1}
                </list>
              }
              isOperator={true}
            />
          }
        />
      }
    >
      <assign
        name="result"
        value={
          <call
            name="concat"
            args={
              <list>
                <ref name="result" />
                {"i"}
              </list>
            }
          />
        }
      />
      <for
        initialization={<let name="j" type={<ref name="any" />} value={0} />}
        condition={
          <call
            name="<"
            args={
              <list>
                <ref name="j" />
                {4}
              </list>
            }
            isOperator={true}
          />
        }
        finalExpression={
          <assign
            name="j"
            value={
              <call
                name="+"
                args={
                  <list>
                    <ref name="j" />
                    {1}
                  </list>
                }
                isOperator={true}
              />
            }
          />
        }
      >
        <assign
          name="result"
          value={
            <call
              name="concat"
              args={
                <list>
                  <ref name="result" />
                  {"j"}
                </list>
              }
            />
          }
        />
        <if
          condition={
            <call
              name="=="
              args={
                <list>
                  <ref name="j" />
                  {2}
                </list>
              }
              isOperator={true}
            />
          }
          elseBlock={false}
        >
          <break />
        </if>
        <assign
          name="result"
          value={
            <call
              name="concat"
              args={
                <list>
                  <ref name="result" />
                  {"d"}
                </list>
              }
            />
          }
        />
      </for>
    </for>
    <ref name="result" />
  </ask>
);
