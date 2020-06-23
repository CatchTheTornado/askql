export = (
  <ask args={<list />} returns={<ref name="string" />}>
    <let
      name="<>"
      type={<ref name="any" />}
      value={
        <fun
          args={
            <list>
              <list>
                {"a"}
                <ref name="float" />
              </list>
              <list>
                {"b"}
                <ref name="float" />
              </list>
            </list>
          }
          returns={<ref name="bool" />}
        >
          <call
            name="not"
            args={
              <list>
                <call
                  name="equals"
                  args={
                    <list>
                      <ref name="a" />
                      <ref name="b" />
                    </list>
                  }
                />
              </list>
            }
          />
        </fun>
      }
    />
    <let name="a" type={<ref name="any" />} value={3} />
    <if
      condition={
        <call
          name="<>"
          args={
            <list>
              <ref name="a" />
              {5}
            </list>
          }
          isOperator={true}
        />
      }
    >
      <return value="It works!" />
    </if>
    {"Ouch."}
  </ask>
);
