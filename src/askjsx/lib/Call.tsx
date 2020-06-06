import { AskCodeOrValue } from '../../askcode';
import { assert, isString } from '../../utils';
import * as askjsx from './jsx';
import { Ref } from './Ref';
askjsx;

export function Call({
  name = '',
  args = [],
}: {
  name?: string;
  args?: AskCodeOrValue[];
}) {
  assert(isString(name), 'name');
  // assert(isStringArray(args), 'args');
  return (
    <code call>
      {name}
      {'params' in args ? (args as any).params : args /* FIXME(mh) */}
    </code>
  );
}
