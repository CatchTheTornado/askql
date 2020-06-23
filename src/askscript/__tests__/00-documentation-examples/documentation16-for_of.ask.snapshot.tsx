export = (
  <ask args={<list />}>
    <forOf
      key={<const name="price" type={<ref name="any" />} />}
      of={<ref name="priceList" />}
    />
  </ask>
);
