export = (
  <ask args={<list />}>
    <const
      name="arr1"
      type={
        <call
          name="array"
          args={
            <list>
              <call
                name="array"
                args={
                  <list>
                    <ref name="int" />
                  </list>
                }
              />
            </list>
          }
        />
      }
      value={
        <list>
          <list />
          <list>
            {1}
            {2}
            {3}
          </list>
        </list>
      }
    />
  </ask>
);
