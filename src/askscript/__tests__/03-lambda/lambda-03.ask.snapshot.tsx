export = (
  <ask args={<list />}>
    <let
      name="myFun"
      type={<ref name="any" />}
      value={
        <fun
          args={<list />}
          returns={<call name="get" args={<list>{"any"}</list>} />}
        >
          <call name="get" args={<list>{"$0"}</list>} />
        </fun>
      }
    />
    <call name="myFun" args={<list>{5}</list>} />
  </ask>
);
