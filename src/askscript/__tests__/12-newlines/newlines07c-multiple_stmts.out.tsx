import * as askjsx from '../../../askjsx';
askjsx;

export const expectedOutput = (
  <ask>
    <set name={'a'} type={'int'} value={1} />
    <set name={'b'} type={'float'} value={1.5} />
    <set name={'c'} type={'bool'} value={false} />
    <set name={'d'} type={'string'} value={'asdf'} />
    <set name={'e'} type={'empty'} value={null} />
    <set name={'f'} type={'any'} value={2.3} />
    <set name={'g'} type={'any'} value={2.3} />
    <set name={'h'} type={'any'} value={2.3} />
  </ask>
);
