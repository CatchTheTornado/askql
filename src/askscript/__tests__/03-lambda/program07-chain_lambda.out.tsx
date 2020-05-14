import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <call
      name={'number'}
      args={[
        <call
          name={'sumOfSquares'}
          args={[
            <call
              name={'toInt'}
              args={[
                <call
                  name={'call'}
                  args={[
                    <call
                      name={'toString'}
                      args={[
                        <call
                          name={'plus'}
                          args={[
                            <call
                              name={'times'}
                              args={[<ref name={'score'} />, 2]}
                            />,
                            1,
                          ]}
                        />,
                      ]}
                    />,
                    <fun args={[['s', 'string']]} returns={'string'}>
                      <fun
                        name={'double'}
                        args={[['s', 'string']]}
                        returns={'string'}
                      >
                        <call
                          name={'concat'}
                          args={[<ref name={'s'} />, <ref name={'s'} />]}
                        />
                      </fun>
                      <call name={'double'} args={[<ref name={'s'} />]} />
                    </fun>,
                  ]}
                />,
              ]}
            />,
          ]}
        />,
      ]}
    />
  </ask>
);
