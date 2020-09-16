export = (
  <ask args={<list />}>
    <const name="hello" type={<ref name="any" />} value="Hello world!" />
    <let name="newStr" type={<ref name="any" />} value="" />
    <forOf
      key={<let name="letter" type={<ref name="any" />} />}
      of={<ref name="hello" />}
    >
      <if
        condition={
          <call
            name="equals"
            args={
              <list>
                <ref name="letter" />
                {"l"}
              </list>
            }
          />
        }
        else={
          <list>
            <assign
              name="newStr"
              value={
                <call
                  name="concat"
                  args={
                    <list>
                      <ref name="newStr" />
                      <call
                        name="toUpperCase"
                        args={
                          <list>
                            <ref name="letter" />
                          </list>
                        }
                      />
                    </list>
                  }
                />
              }
            />
          </list>
        }
        elseBlock={true}
      >
        <assign
          name="newStr"
          value={
            <call
              name="concat"
              args={
                <list>
                  <ref name="newStr" />
                  {"x"}
                </list>
              }
            />
          }
        />
      </if>
    </forOf>
    <ref name="newStr" />
  </ask>
);
