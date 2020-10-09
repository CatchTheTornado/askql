export = (
  <ask args={<list />}>
    <call
      name="filter"
      args={
        <list>
          <list>
            {"Oak"}
            {"Willow"}
            {"Acacia"}
            {"Adair"}
            {"Alder"}
            {"Apple"}
            {"Basswood"}
          </list>
          <fun
            args={
              <list>
                <list>
                  {"c"}
                  <ref name="any" />
                </list>
                <list>
                  {"i"}
                  <ref name="any" />
                </list>
                <list>
                  {"arr"}
                  <ref name="any" />
                </list>
              </list>
            }
            returns={<ref name="any" />}
          >
            <call
              name="greaterThan"
              args={
                <list>
                  <call
                    name="length"
                    args={
                      <list>
                        <ref name="c" />
                      </list>
                    }
                  />
                  {5}
                </list>
              }
            />
          </fun>
        </list>
      }
    />
  </ask>
);
