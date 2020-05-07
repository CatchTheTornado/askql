import { assert, isString, isStringArray } from '../../utils';
import * as askjsx from './jsx';
import { Ref } from './Ref';
import { Set } from './Set';
askjsx;

export function Fun({
  name = '',
  args = [],
  children = [],
}: {
  name?: string;
  args?: string[];
  children?: askjsx.AskNode[];
}) {
  assert(isString(name), 'name');
  assert(isStringArray(args), 'args');

  const expressions = children;
  if (expressions.length === 0) {
    throw new Error('Functions need to have at least one expression');
  }
  const f = (
    <code fun>
      {args.map((arg, index) => (
        <Set name={arg} value={<Ref name={`frame.args.${index}`} />} />
      ))}
      {expressions}
    </code>
  );

  if (!name) {
    return f;
  }

  return <Set name={name} value={f} />;
}
