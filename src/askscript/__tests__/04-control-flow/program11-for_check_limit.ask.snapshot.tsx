export = (
  <ask
    args={
      <list>
        <list>
          {"limit"}
          <ref name="any" />
        </list>
      </list>
    }
  >
    <let name="i" type={<ref name="any" />} value={0} />
    <for
      initialization={<assign name="i" value={0} />}
      condition={
        <call
          name="<"
          args={
            <list>
              <ref name="i" />
              <ref name="limit" />
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
    />
    <ref name="i" />
  </ask>
);
