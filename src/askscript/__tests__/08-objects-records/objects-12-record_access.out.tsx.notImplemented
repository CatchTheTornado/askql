import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <set
      name={'capitals'}
      type={'record(string)'}
      value={{ France: 'Paris', Germany: 'Berlin', Spain: 'Madrid' }}
    />
    <set
      name={'paris'}
      type={'any'}
      value={<call name={'at'} args={[<ref name={'capitals'} />, 'France']} />}
    />
    <set
      name={'berlin'}
      type={'string'}
      value={<call name={'at'} args={[<ref name={'capitals'} />, 'Germany']} />}
    />
    <call name={'at'} args={[<ref name={'capitals'} />, 'Spain']} />
  </ask>
);
