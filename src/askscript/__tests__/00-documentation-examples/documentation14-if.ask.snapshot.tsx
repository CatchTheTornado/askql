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
    >
      <return value={<ref name="n" />} />
    </if>
  </ask>
);
