export = (
  <ask args={<list />}>
    <const
      name="three"
      type={<ref name="any" />}
      value={
        <fun args={<list />} returns={<ref name="int" />}>
          <return value={3} />
        </fun>
      }
    />
    <call name="three" args={<list />} />
  </ask>
);
