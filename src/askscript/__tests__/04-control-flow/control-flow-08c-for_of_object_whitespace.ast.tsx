export = (
  <ask args={<list />}>
    <const
      name="itemPrices"
      type={<ref name="any" />}
      value={
        <struct>
          {"a"}
          {10}
          {"b"}
          {40}
          {"c"}
          {32}
          {"d"}
          {99}
        </struct>
      }
    />
    <let name="mySum" type={<ref name="float" />} value={0} />
    <forOf
      key={<let name="itemPrice" type={<ref name="any" />} />}
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
