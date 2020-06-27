export = (
  <ask args={<list />}>
    <const
      name="f"
      type={<ref name="any" />}
      value={
        <fun
          args={
            <list>
              <list>
                {"arg"}
                <ref name="any" />
              </list>
            </list>
          }
          returns={<ref name="any" />}
        >
          <call
            name="+"
            args={
              <list>
                <ref name="arg" />
                {3}
              </list>
            }
            isOperator={true}
          />
        </fun>
      }
    />
    <let
      name="numbers"
      type={<ref name="any" />}
      value={
        <list>
          {1}
          {1}
          {2}
          {3}
          {5}
          {8}
          {13}
          {21}
          {34}
          {55}
          {89}
        </list>
      }
    />
    <let
      name="two"
      type={<ref name="any" />}
      value={
        <call
          name="at"
          args={
            <list>
              <ref name="numbers" />
              {2}
            </list>
          }
        />
      }
    />
    <let
      name="three"
      type={<ref name="any" />}
      value={
        <call
          name="at"
          args={
            <list>
              <ref name="numbers" />
              <call
                name="/"
                args={
                  <list>
                    {12}
                    {4}
                  </list>
                }
                isOperator={true}
              />
            </list>
          }
        />
      }
    />
    <call
      name="+"
      args={
        <list>
          <call
            name="at"
            args={
              <list>
                <ref name="numbers" />
                <call
                  name="-"
                  args={
                    <list>
                      <call
                        name="length"
                        args={
                          <list>
                            <ref name="numbers" />
                          </list>
                        }
                      />
                      {1}
                    </list>
                  }
                  isOperator={true}
                />
              </list>
            }
          />
          <call
            name="at"
            args={
              <list>
                <ref name="numbers" />
                <call
                  name="f"
                  args={
                    <list>
                      <call
                        name="at"
                        args={
                          <list>
                            <ref name="numbers" />
                            {2}
                          </list>
                        }
                      />
                    </list>
                  }
                />
              </list>
            }
          />
        </list>
      }
      isOperator={true}
    />
  </ask>
);
