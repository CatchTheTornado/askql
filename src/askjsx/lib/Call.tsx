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

  // This is a temporary way of linking some AskScript code.
  // We'll have to make typing work before introducing a better way
  if (name === 'useFor') {
    assert('params' in args, 'No params found in arguments');
    const params = (args as any).params;
    assert(Array.isArray(params), 'params should be an array');
    assert(params.length == 2, `expecting exactly 2 params for ${name}`);

    if ((args as any).params)
      return (
        <code call>
          <Ref name={'call'} />
          {[(args as any).params[1], (args as any).params[0]]}
        </code>
      );
  }

  return (
    <code call>
      {name ? <Ref name={name} /> : fun}
      {'params' in args ? (args as any).params : args}
    </code>
  );
}
