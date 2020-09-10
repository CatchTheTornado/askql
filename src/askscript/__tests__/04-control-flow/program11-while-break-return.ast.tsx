export = (
  <ask args={<list />}>
    <let name="n" type={<ref name="any" />} value={1} />
    <while
      condition={
        <call
          name="<"
          args={
            <list>
              <ref name="n" />
              {10}
            </list>
          }
          isOperator={true}
        />
      }
    >
      <if
        condition={
          <call
            name="=="
            args={
              <list>
                <ref name="n" />
                {3}
              </list>
            }
            isOperator={true}
          />
        }
      >
        <break />
        <return value="bum" />
      </if>
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
