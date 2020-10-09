export = (
  <ask args={<list />}>
    <let name="sum" type={<ref name="any" />} value={0} />
    <call
      name="each"
      args={
        <list>
          <list>
            {1}
            {2}
            {3}
            {4}
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
              </list>
            }
            returns={<ref name="any" />}
          >
            <assign
              name="sum"
              value={
                <call
                  name="plus"
                  args={
                    <list>
                      <ref name="sum" />
                      <ref name="c" />
                    </list>
                  }
                />
              }
            />
          </fun>
        </list>
      }
    />
    <ref name="sum" />
  </ask>
);
