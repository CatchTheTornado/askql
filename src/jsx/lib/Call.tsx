import { AskCodeOrValue } from '../../askcode';
import { assert, isString, isStringArray } from '../../utils';
import * as askjsx from './jsx';
import { Ref } from './Ref';
askjsx;

export function Call({
  name = '',
  args = [],
  children: fun = [],
}: {
  name?: string;
  args?: AskCodeOrValue[];
  children?: AskCodeOrValue[];
}) {
  assert(isString(name), 'name');
  assert(isStringArray(args), 'args');
  return (
    <code call>
      {name ? <Ref name={name} /> : fun}
      {args}
    </code>
  );
}
