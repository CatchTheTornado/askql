export = (
  <ask args={<list />}>
    <while
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
    </while>
    <return value={<ref name="x" />} />
  </ask>
);
