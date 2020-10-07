export = (
  <ask args={<list />}>
    <if
      condition={5}
      else={
        <list>
          <return value={<ref name="no" />} />
        </list>
      }
      elseBlock={true}
    >
      <return value={<ref name="yes" />} />
    </if>
  </ask>
);
