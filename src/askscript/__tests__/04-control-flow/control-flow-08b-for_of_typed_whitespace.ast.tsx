export = (
  <ask args={<list />}>
    <const
      name="itemPrices"
      type={<ref name="any" />}
      value={
        <list>
          {10}
          {40}
          {32}
          {99}
        </list>
      }
    />
    <let name="mySum" type={<ref name="float" />} value={0} />
    <forOf
      key={<let name="itemPrice" type={<ref name="float" />} />}
      of={<ref name="itemPrices" />}
    >
      <assign
        name="mySum"
        value={
          <call
            name="plus"
            args={
              <list>
                <ref name="mySum" />
                <ref name="itemPrice" />
              </list>
            }
          />
        }
      />
    </forOf>
    <ref name="mySum" />
  </ask>
);
