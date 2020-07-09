export = (
  <ask args={<list />}>
    <call
      name="test"
      args={
        <list>
          {"equals"}
          <fun args={<list />} returns={<ref name="any" />}>
            <call
              name="toBe"
              args={
                <list>
                  <call
                    name="expect"
                    args={
                      <list>
                        <call
                          name="!"
                          args={
                            <list>
                              <call name="true" args={<list />} />
                            </list>
                          }
                          isOperator={true}
                          isUnaryOperator={true}
                        />
                      </list>
                    }
                  />
                  <call name="false" args={<list />} />
                </list>
              }
            />
            <call
              name="toBe"
              args={
                <list>
                  <call
                    name="expect"
                    args={
                      <list>
                        <call
                          name="!"
                          args={
                            <list>
                              <call name="false" args={<list />} />
                            </list>
                          }
                          isOperator={true}
                          isUnaryOperator={true}
                        />
                      </list>
                    }
                  />
                  <call name="true" args={<list />} />
                </list>
              }
            />
            <call
              name="toBe"
              args={
                <list>
                  <call
                    name="expect"
                    args={
                      <list>
                        <call
                          name="logicalOr"
                          args={
                            <list>
                              <call
                                name="!"
                                args={
                                  <list>
                                    <call name="false" args={<list />} />
                                  </list>
                                }
                                isOperator={true}
                                isUnaryOperator={true}
                              />
                              <call name="true" args={<list />} />
                            </list>
                          }
                        />
                      </list>
                    }
                  />
                  <call name="true" args={<list />} />
                </list>
              }
            />
            <call
              name="toBe"
              args={
                <list>
                  <call
                    name="expect"
                    args={
                      <list>
                        <call
                          name="||"
                          args={
                            <list>
                              <call
                                name="!"
                                args={
                                  <list>
                                    <call name="false" args={<list />} />
                                  </list>
                                }
                                isOperator={true}
                                isUnaryOperator={true}
                              />
                              <call name="true" args={<list />} />
                            </list>
                          }
                          isOperator={true}
                        />
                      </list>
                    }
                  />
                  <call name="true" args={<list />} />
                </list>
              }
            />
          </fun>
        </list>
      }
    />
  </ask>
);
