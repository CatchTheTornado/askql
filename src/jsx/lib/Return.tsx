import { Fragment } from './Fragment';
import * as askjsx from './jsx';
import { Set } from './Set';
askjsx;

export function Return({ value }: { value: string }) {
  return (
    <Fragment>
      <Set name="frame.returnedValue" value={value} />
    </Fragment>
  );
}
