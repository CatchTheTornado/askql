export = (
  <ask args={<list />}>
    <if
      condition={
        <call
          name="!="
          args={
            <list>
              {2}
              {2}
            </list>
          }
          isOperator={true}
        />
      }
    >
      <return value={<call name="true" args={<list />} />} />
    </if>
  </ask>
);
