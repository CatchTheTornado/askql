import { assert, isString } from '../../utils';
import * as askjsx from './jsx';
askjsx;

export function Set({ name, value }: { name: string; value: string }) {
  assert(isString(name), 'name');
  return (
    <code set>
      {value}
      {name.split('.')}
    </code>
  );
}
