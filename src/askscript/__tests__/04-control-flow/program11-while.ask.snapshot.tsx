export = (
  <ask args={<list />}>
    <let name="n" type={<ref name="any" />} value={1} />
    <while
      condition={
        <call
          name="<"
          args={
            <list>
              <call
                name="*"
                args={
                  <list>
                    <ref name="n" />
                    <ref name="n" />
                  </list>
                }
                isOperator={true}
              />
              {10}
            </list>
          }
          isOperator={true}
        />
      }
    >
      <assign
        name="n"
        value={
          <call
            name="+"
            args={
              <list>
                <ref name="n" />
                {1}
              </list>
            }
            isOperator={true}
          />
        }
      />
    </while>
    <ref name="n" />
  </ask>
);
