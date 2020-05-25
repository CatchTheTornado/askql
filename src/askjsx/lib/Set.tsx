import { assert, isString } from '../../utils';
import * as askjsx from './jsx';
import { AskCodeOrValue } from '../../askcode';
askjsx;

export function Set({
  name,
  value,
}: {
  name: string;
  type?: string;
  value: AskCodeOrValue;
}) {
  if (typeof name !== 'string') {
    name = (name as any).params[0]; // fixme(me)
  }
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

export const Const = Set;
export const Assign = Set;
