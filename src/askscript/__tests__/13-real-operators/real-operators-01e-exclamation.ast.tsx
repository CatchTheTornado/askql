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
      elseBlock={false}
    >
      <return value={<call name="true" args={<list />} />} />
    </if>
  </ask>
);
