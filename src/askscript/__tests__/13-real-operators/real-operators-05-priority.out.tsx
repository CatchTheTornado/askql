import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <call
      name={'+'}
      args={[
        <call
          name={'+'}
          args={[
            <call
              name={'+'}
              args={[
                <call
                  name={'+'}
                  args={[
                    <call
                      name={'+'}
                      args={[
                        <call
                          name={'+'}
                          args={[1, <call name={'*'} args={[2, 3]} />]}
                        />,
                        <call
                          name={'*'}
                          args={[<call name={'*'} args={[4, 5]} />, 6]}
                        />,
                      ]}
                    />,
                    7,
                  ]}
                />,
                8,
              ]}
            />,
            9,
          ]}
        />,
        <call name={'*'} args={[10, 11]} />,
      ]}
    />
  </ask>
);
