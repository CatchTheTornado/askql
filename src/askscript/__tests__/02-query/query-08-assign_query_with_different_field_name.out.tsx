import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <const
      name={'result'}
      type={'any'}
      value={
        <query>
          <leaf name={'firstField'} value={<ref name={'middleName'} />} />
          <leaf
            name={'secondField'}
            value={<call name={'fun2'} args={[34, 'adfs', []]} />}
          />
          <leaf
            name={'thirdField'}
            value={
              <call
                name={'fun3'}
                args={[<call name={'fun2'} args={[34, 'adfs', []]} />]}
              />
            }
          />
          <leaf
            name={'upperCaseFullName'}
            value={
              <call
                name={'upperCase'}
                args={[
                  <call
                    name={'concat'}
                    args={[
                      <ref name={'firstName'} />,
                      ' ',
                      <ref name={'lastName'} />,
                    ]}
                  />,
                ]}
              />
            }
          />
        </query>
      }
    />
    <ref name={'result'} />
  </ask>
);
