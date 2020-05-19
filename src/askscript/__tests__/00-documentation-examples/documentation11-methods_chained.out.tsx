import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <return
      value={
        <call
          name={'multiply'}
          args={[
            7,
            <call
              name={'plus'}
              args={[8, <call name={'minus'} args={[1, 4]} />]}
            />,
          ]}
        />
      }
    />
    <call
      name={'multiply'}
      args={[
        2,
        <call
          name={'plus'}
          args={[3, <call name={'minus'} args={[4, 1]} />]}
        />,
      ]}
    />
  </ask>
);
