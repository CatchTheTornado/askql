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
    <forIn
      key={<let name="index" type={<ref name="int" />} />}
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
