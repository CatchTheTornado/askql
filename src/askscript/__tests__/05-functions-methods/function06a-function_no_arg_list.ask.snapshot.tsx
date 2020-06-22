export = (
  <ask args={<list />}>
    <const
      name="func"
      type={<ref name="any" />}
      value={
        <fun args={<list />} returns={<ref name="any" />}>
          <return value={5} />
        </fun>
      }
    />
    <call name="func" args={<list />} />
  </ask>
);
