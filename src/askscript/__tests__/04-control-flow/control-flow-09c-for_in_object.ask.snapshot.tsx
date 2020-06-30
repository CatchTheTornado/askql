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
    <forIn
      key={<let name="index" type={<ref name="any" />} />}
      in={<ref name="itemPrices" />}
    >
      <assign
        name="mySum"
        value={
          <call
            name="+"
            args={
              <list>
                <ref name="mySum" />
                <call
                  name="at"
                  args={
                    <list>
                      <ref name="itemPrices" />
                      <ref name="index" />
                    </list>
                  }
                />
              </list>
            }
            isOperator={true}
          />
        }
      />
    </forIn>
    <ref name="mySum" />
  </ask>
);
