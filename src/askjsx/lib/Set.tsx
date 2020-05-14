import { assert, isString } from '../../utils';
import * as askjsx from './jsx';
askjsx;

export function Set({ name, value }: { name: string; value: string }) {
  if (Array.isArray(name)) name = name[0]; //TODO(mh): Support types

  assert(
    isString(name),
    `name should be string, got: ${JSON.stringify(name, null, 2)}`
  );

  return (
    <code let>
      {name.split('.')}
      {value}
    </code>
  );
}
