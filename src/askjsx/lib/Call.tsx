import { assert, isString, isStringArray } from '../../utils';
import * as jsx from './jsx';
import { Ref } from './Ref';
jsx;

export function Call({
  name = '',
  args = [],
  children: fun = [],
}: {
  name?: string;
  args?: string[];
  children?: jsx.AskNode[];
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
