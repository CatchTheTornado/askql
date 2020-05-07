import { AskCodeOrValue } from '../../askcode';
import { assert, isString, isStringArray } from '../../utils';
import * as askjsx from './';
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
  children?: AskCodeOrValue[];
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
        <Set name={arg} value={<Ref name={`$${index}`} />} />
      ))}
      {expressions}
    </code>
  );

  if (!name) {
    return f;
  }

  return <Set name={name} value={f} />;
}
