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
      key={<const name="itemPrice" type={<ref name="any" />} />}
      of={<ref name="itemPrices" />}
    >
      <if
        condition={
          <call
            name="=="
            args={
              <list>
                <ref name="itemPrice" />
                {32}
              </list>
            }
            isOperator={true}
          />
        }
      >
        <break />
      </if>
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
