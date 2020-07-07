export = (
  <ask args={<list />}>
    <const
      name="covid"
      type={<ref name="any" />}
      value={
        <list>
          <struct>
            {"country"}
            {"USA"}
            {"newInfected"}
            {69128}
            {"newDeaths"}
            {1047}
            {"newRecovered"}
            {19342}
          </struct>
          <struct>
            {"country"}
            {"Spain"}
            {"newInfected"}
            {13598}
            {"newDeaths"}
            {217}
            {"newRecovered"}
            {578}
          </struct>
          <struct>
            {"country"}
            {"Russia"}
            {"newInfected"}
            {1551}
            {"newDeaths"}
            {93}
            {"newRecovered"}
            {178}
          </struct>
          <struct>
            {"country"}
            {"Italy"}
            {"newInfected"}
            {992}
            {"newDeaths"}
            {262}
            {"newRecovered"}
            {688}
          </struct>
          <struct>
            {"country"}
            {"UK"}
            {"newInfected"}
            {3687}
            {"newDeaths"}
            {428}
            {"newRecovered"}
            {19342}
          </struct>
        </list>
      }
    />
    <call
      name="log"
      args={
        <list>
          {"map: "}
          <call
            name="map"
            args={
              <list>
                <ref name="covid" />
                <fun
                  args={
                    <list>
                      <list>
                        {"c"}
                        <ref name="any" />
                      </list>
                    </list>
                  }
                  returns={<ref name="any" />}
                >
                  <return
                    value={
                      <call
                        name="at"
                        args={
                          <list>
                            <ref name="c" />
                            {"newInfected"}
                          </list>
                        }
                      />
                    }
                  />
                </fun>
              </list>
            }
          />
        </list>
      }
    />
    <const
      name="totalNewInfected"
      type={<ref name="any" />}
      value={
        <call
          name="sum"
          args={
            <list>
              <call
                name="map"
                args={
                  <list>
                    <ref name="covid" />
                    <fun
                      args={
                        <list>
                          <list>
                            {"c"}
                            <ref name="any" />
                          </list>
                        </list>
                      }
                      returns={<ref name="any" />}
                    >
                      <return
                        value={
                          <call
                            name="at"
                            args={
                              <list>
                                <ref name="c" />
                                {"newInfected"}
                              </list>
                            }
                          />
                        }
                      />
                    </fun>
                  </list>
                }
              />
            </list>
          }
        />
      }
    />
    <const
      name="totalNewDeaths"
      type={<ref name="any" />}
      value={
        <call
          name="sum"
          args={
            <list>
              <call
                name="map"
                args={
                  <list>
                    <ref name="covid" />
                    <fun
                      args={
                        <list>
                          <list>
                            {"a"}
                            <ref name="any" />
                          </list>
                        </list>
                      }
                      returns={<ref name="any" />}
                    >
                      <return
                        value={
                          <call
                            name="at"
                            args={
                              <list>
                                <ref name="a" />
                                {"newDeaths"}
                              </list>
                            }
                          />
                        }
                      />
                    </fun>
                  </list>
                }
              />
            </list>
          }
        />
      }
    />
    <const
      name="totalnewRecovered"
      type={<ref name="any" />}
      value={
        <call
          name="sum"
          args={
            <list>
              <call
                name="map"
                args={
                  <list>
                    <ref name="covid" />
                    <fun
                      args={
                        <list>
                          <list>
                            {"a"}
                            <ref name="any" />
                          </list>
                        </list>
                      }
                      returns={<ref name="any" />}
                    >
                      <return
                        value={
                          <call
                            name="at"
                            args={
                              <list>
                                <ref name="a" />
                                {"newRecovered"}
                              </list>
                            }
                          />
                        }
                      />
                    </fun>
                  </list>
                }
              />
            </list>
          }
        />
      }
    />
    <const
      name="total"
      type={<ref name="any" />}
      value={
        <call
          name="sum"
          args={
            <list>
              <list>
                <ref name="totalNewInfected" />
                <ref name="totalNewDeaths" />
                <ref name="totalnewRecovered" />
              </list>
            </list>
          }
        />
      }
    />
    <call
      name="log"
      args={
        <list>
          {"Total new infected - "}
          <ref name="totalNewInfected" />
        </list>
      }
    />
    <call
      name="log"
      args={
        <list>
          {"Total new deaths - "}
          <ref name="totalNewDeaths" />
        </list>
      }
    />
    <call
      name="log"
      args={
        <list>
          {"Total new recovered - "}
          <ref name="totalnewRecovered" />
        </list>
      }
    />
    <call
      name="log"
      args={
        <list>
          {"Total - "}
          <ref name="total" />
        </list>
      }
    />
    <return
      value={
        <struct>
          {"totalNewDeaths"}
          <ref name="totalNewDeaths" />
          {"totalNewInfected"}
          <ref name="totalNewInfected" />
          {"totalnewRecovered"}
          <ref name="totalnewRecovered" />
          {"total"}
          <ref name="total" />
        </struct>
      }
    />
  </ask>
);
