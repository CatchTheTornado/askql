import { assert, isString, isStringArray } from '../../utils';
import * as jsx from './';
jsx;

export function Fun({
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

  const expressions = children;
  if (expressions.length === 0) {
    throw new Error('Functions need to have at least one expression');
  }
  const f = (
    <fun>
      {args.map((arg, index) => (
        <set>
          <ref>
            {'frame'}
            {'args'}
            {index}
          </ref>
          {arg}
        </set>
      ))}
      {expressions}
    </fun>
  );

  if (!name) {
    return f;
  }

  return (
    <set>
      {f}
      {name}
    </set>
  );
}
