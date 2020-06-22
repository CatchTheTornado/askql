export = (
  <ask args={<list />}>
    <const
      name="nums"
      type={<ref name="any" />}
      value={
        <list>
          {1}
          {2}
          {3}
          {5}
          {7}
        </list>
      }
    />
    <let name="sum" type={<ref name="any" />} value={0} />
    <for
      initialization={<let name="i" type={<ref name="any" />} value={0} />}
      condition={
        <call
          name="<"
          args={
            <list>
              <ref name="i" />
              <call
                name="length"
                args={
                  <list>
                    <ref name="nums" />
                  </list>
                }
              />
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
        name="sum"
        value={
          <call
            name="+"
            args={
              <list>
                <ref name="sum" />
                <call
                  name="at"
                  args={
                    <list>
                      <ref name="nums" />
                      <ref name="i" />
                    </list>
                  }
                />
              </list>
            }
            isOperator={true}
          />
        }
      />
    </for>
    <ref name="sum" />
  </ask>
);
