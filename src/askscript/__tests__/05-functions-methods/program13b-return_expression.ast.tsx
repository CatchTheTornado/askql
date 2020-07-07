export = (
  <ask args={<list />}>
    {"Hello world!"}
    <return
      value={
        <call
          name="plus"
          args={
            <list>
              <ref name="n" />
              {1}
            </list>
          }
        />
      }
    />
    <ref name="hello" />
  </ask>
);
