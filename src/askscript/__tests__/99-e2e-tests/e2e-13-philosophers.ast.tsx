export = (
  <ask args={<list />}>
    <call
      name="find"
      args={
        <list>
          <ref name="philosophers" />
          <fun
            args={
              <list>
                <list>
                  {"name"}
                  <ref name="any" />
                </list>
              </list>
            }
            returns={<ref name="any" />}
          >
            <call
              name="is"
              args={
                <list>
                  <call
                    name="at"
                    args={
                      <list>
                        <ref name="scorePerPhilosopher" />
                        <ref name="name" />
                      </list>
                    }
                  />
                  <call
                    name="max"
                    args={
                      <list>
                        <ref name="scorePerPhilosopher" />
                      </list>
                    }
                  />
                </list>
              }
            />
          </fun>
        </list>
      }
    />
  </ask>
);
