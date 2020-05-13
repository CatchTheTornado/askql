import * as askjsx from "../../../askjsx";

export const expectedOutput = (
  <ask>
    <const name={'arr1'} type={'array(int)'} value={[1,2,3]} />
    <const name={'arr2'} type={'any'} value={[1,2,3]} />
    <const name={'arr3'} type={'any'} value={[1.3,1.4,1.5]} />
    <const name={'arr4'} type={'any'} value={['asdf','qwer','tyui']} />
  </ask>
);
