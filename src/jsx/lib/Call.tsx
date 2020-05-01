import { assert, isString, isStringArray } from '../../utils';
import * as jsx from './jsx';
jsx;

export function Call({
  name = '',
  args = [],
  children = [],
}: {
  name?: string;
  args?: string[];
  children?: jsx.AskNode[];
}) {
  assert(isString(name), 'name');
  assert(isStringArray(args), 'args');
  return (
    <call>
      {name ? <ref>{name.split('.')}</ref> : children}
      {args.map((arg) => jsx.render(arg))}
    </call>
  );
}
