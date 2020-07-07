export = (
  <ask args={<list />}>
    <const name="hello" type={<ref name="any" />} value="Hello world!" />
    <let name="newStr" type={<ref name="any" />} value="" />
    <forIn
      key={<let name="index" type={<ref name="any" />} />}
      in={<ref name="hello" />}
    >
      <const
        name="letter"
        type={<ref name="any" />}
        value={
          <call
            name="at"
            args={
              <list>
                <ref name="hello" />
                <ref name="index" />
              </list>
            }
          />
        }
      />
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
    </forIn>
    <ref name="newStr" />
  </ask>
);
