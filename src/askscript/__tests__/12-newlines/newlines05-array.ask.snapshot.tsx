export = (
  <ask args={<list />}>
    <let
      name="arr1"
      type={
        <call
          name="array"
          args={
            <list>
              <ref name="int" />
            </list>
          }
        />
      }
      value={
        <list>
          {1}
          {2}
          {3}
        </list>
      }
    />
    <let
      name="arr2"
      type={<ref name="any" />}
      value={
        <list>
          {1}
          {2}
          {3}
        </list>
      }
    />
    <let
      name="arr3"
      type={<ref name="any" />}
      value={
        <list>
          {1.3}
          {1.4}
          {1.5}
        </list>
      }
    />
    <let
      name="arr4"
      type={<ref name="any" />}
      value={
        <list>
          {"asdf"}
          {"qwer"}
          {"tyui"}
        </list>
      }
    />
  </ask>
);
