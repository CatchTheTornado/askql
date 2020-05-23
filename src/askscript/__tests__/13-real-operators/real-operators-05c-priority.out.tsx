import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <call
      name={'*'}
      args={[
        <call
          name={'/'}
          args={[
            <call
              name={'*'}
              args={[
                <call
                  name={'/'}
                  args={[
                    <call
                      name={'*'}
                      args={[
                        <call
                          name={'/'}
                          args={[<call name={'*'} args={[1, 2]} />, 3]}
                        />,
                        4,
                      ]}
                    />,
                    5,
                  ]}
                />,
                6,
              ]}
            />,
            7,
          ]}
        />,
        8,
      ]}
    />
  </ask>
);
