export = (
  <ask args={<list />}>
    <let
      name="useFor"
      type={<ref name="any" />}
      value={
        <fun
          args={
            <list>
              <list>
                {"x"}
                <ref name="any" />
              </list>
              <list>
                {"f"}
                <ref name="any" />
              </list>
            </list>
          }
          returns={<ref name="any" />}
        >
          <call
            name="f"
            args={
              <list>
                <ref name="x" />
              </list>
            }
          />
        </fun>
      }
    />
    <call
      name="ceil"
      args={
        <list>
          <call
            name="divideBy"
            args={
              <list>
                <call
                  name="toInt"
                  args={
                    <list>
                      <call
                        name="useFor"
                        args={
                          <list>
                            <call
                              name="toString"
                              args={
                                <list>
                                  <call
                                    name="plus"
                                    args={
                                      <list>
                                        <call
                                          name="times"
                                          args={
                                            <list>
                                              {5}
                                              {2}
                                            </list>
                                          }
                                        />
                                        {1}
                                      </list>
                                    }
                                  />
                                </list>
                              }
                            />
                            <fun
                              args={
                                <list>
                                  <list>
                                    {"s"}
                                    <ref name="string" />
                                  </list>
                                </list>
                              }
                              returns={<ref name="string" />}
                            >
                              <const
                                name="double"
                                type={<ref name="any" />}
                                value={
                                  <fun
                                    args={
                                      <list>
                                        <list>
                                          {"s"}
                                          <ref name="string" />
                                        </list>
                                      </list>
                                    }
                                    returns={<ref name="string" />}
                                  >
                                    <call
                                      name="concat"
                                      args={
                                        <list>
                                          <ref name="s" />
                                          <ref name="s" />
                                        </list>
                                      }
                                    />
                                  </fun>
                                }
                              />
                              <call
                                name="double"
                                args={
                                  <list>
                                    <ref name="s" />
                                  </list>
                                }
                              />
                            </fun>
                          </list>
                        }
                      />
                    </list>
                  }
                />
                {6}
              </list>
            }
          />
        </list>
      }
    />
  </ask>
);
