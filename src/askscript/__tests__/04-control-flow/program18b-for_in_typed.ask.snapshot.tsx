export = (
  <ask args={<list />}>
    <let name="mySum" type={<ref name="float" />} value={0} />
    <forIn
      key={<let name="index" type={<ref name="int" />} />}
      in={<ref name="itemPrices" />}
    >
      <assign
        name="mySum"
        value={
          <call
            name="plus"
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
          />
        }
      />
    </forIn>
    <ref name="mySum" />
  </ask>
);
