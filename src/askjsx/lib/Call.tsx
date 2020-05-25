import { AskCodeOrValue } from '../../askcode';
import { assert, isString } from '../../utils';
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
  // assert(isStringArray(args), 'args');
  return (
    <code call>
      {name ? <Ref name={name} /> : fun}
      {'params' in args ? (args as any).params : args}
    </code>
  );
}
