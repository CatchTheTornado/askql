export = (
  <ask args={<list />}>
    <call
      name="map"
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
              </list>
            }
            returns={<ref name="any" />}
          >
            <call
              name="+"
              args={
                <list>
                  <ref name="c" />
                  {5}
                </list>
              }
              isOperator={true}
            />
          </fun>
        </list>
      }
    />
  </ask>
);
