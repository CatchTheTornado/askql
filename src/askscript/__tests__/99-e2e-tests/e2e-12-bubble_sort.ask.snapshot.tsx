export = (
  <ask args={<list />}>
    <let
      name="arr"
      type={<ref name="any" />}
      value={
        <list>
          {342.34}
          {35767}
          {2}
          {117}
          {999}
          {3435}
        </list>
      }
    />
    <const
      name="len"
      type={<ref name="any" />}
      value={
        <call
          name="length"
          args={
            <list>
              <ref name="arr" />
            </list>
          }
        />
      }
    />
    <for
      initialization={<let name="i" type={<ref name="any" />} value={0} />}
      condition={
        <call
          name="<"
          args={
            <list>
              <ref name="i" />
              <ref name="len" />
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
      <for
        initialization={<let name="j" type={<ref name="any" />} value={0} />}
        condition={
          <call
            name="<"
            args={
              <list>
                <ref name="j" />
                <call
                  name="-"
                  args={
                    <list>
                      <call
                        name="-"
                        args={
                          <list>
                            <ref name="len" />
                            <ref name="i" />
                          </list>
                        }
                        isOperator={true}
                      />
                      {1}
                    </list>
                  }
                  isOperator={true}
                />
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
        <if
          condition={
            <call
              name=">"
              args={
                <list>
                  <call
                    name="at"
                    args={
                      <list>
                        <ref name="arr" />
                        <ref name="j" />
                      </list>
                    }
                  />
                  <call
                    name="at"
                    args={
                      <list>
                        <ref name="arr" />
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
                      </list>
                    }
                  />
                </list>
              }
              isOperator={true}
            />
          }
        >
          <assign
            name="arr"
            value={
              <call
                name="set"
                args={
                  <list>
                    <call
                      name="set"
                      args={
                        <list>
                          <ref name="arr" />
                          <ref name="j" />
                          <call
                            name="at"
                            args={
                              <list>
                                <ref name="arr" />
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
                              </list>
                            }
                          />
                        </list>
                      }
                    />
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
                    <call
                      name="at"
                      args={
                        <list>
                          <ref name="arr" />
                          <ref name="j" />
                        </list>
                      }
                    />
                  </list>
                }
              />
            }
          />
        </if>
      </for>
    </for>
    <ref name="arr" />
  </ask>
);
