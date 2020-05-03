import * as jsx from './jsx';
import { Set } from './Set';
import { Fragment } from './Fragment';
jsx;

export function Return({ value }: { value: string }) {
  return (
    <Fragment>
      <Set name="frame.returnedValue" value={value} />
    </Fragment>
  );
}
