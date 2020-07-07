export = (
  <ask args={<list />}>
    <const
      name="arr"
      type={<ref name="any" />}
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
