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
  ask = false,
}: {
  name?: string;
  args?: any[]; //TODO(mh)
  children?: AskCodeOrValue[];
  returns?: any;
  ask?: boolean;
}) {
  assert(isString(name), 'name');
  // assert(isStringArray(args), 'args'); // TODO(mh)

  const expressions = children;
  if (expressions.length === 0) {
    throw new Error('Functions need to have at least one expression');
  }
  const f = (
    <code ask={ask || undefined} fun={!ask || undefined}>
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
