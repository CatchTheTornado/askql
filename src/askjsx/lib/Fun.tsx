import { AskCodeOrValue } from '../../askcode';
import { assert, isString } from '../../utils';
import * as askjsx from './';
import { Ref } from './Ref';
import { Set } from './Set';
askjsx;

export function Fun({
  name = '',
  args = [],
  children: expressions = [],
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

  const f = (
    <code ask={ask || undefined} fun={!ask || undefined}>
      {args.map((arg, index) => (
        <Set name={arg} value={<Ref name={`$${index}`} />} />
      ))}
      {expressions.length > 0 ? expressions : null}
    </code>
  );

  if (!name) {
    return f;
  }

  return <Set name={name} value={f} />;
}
