export = (
  <ask args={<list />}>
    <if
      condition={
        <call
          name="lessThan"
          args={
            <list>
              <ref name="n" />
              {2}
            </list>
          }
        />
      }
      elseBlock={false}
    >
      <return value={<ref name="a" />} />
    </if>
    <return value={<ref name="b" />} />
  </ask>
);
