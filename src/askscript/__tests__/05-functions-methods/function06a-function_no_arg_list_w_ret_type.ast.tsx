export = (
  <ask args={<list />}>
    <const
      name="func"
      type={<ref name="any" />}
      value={
        <fun args={<list />} returns={<ref name="int" />}>
          <return value={6} />
        </fun>
      }
    />
    <call name="func" args={<list />} />
  </ask>
);
