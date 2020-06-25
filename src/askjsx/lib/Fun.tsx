import { AskCodeOrValue } from '../../askcode';
import { assert, isString } from '../../utils';
import * as askjsx from './';
import { Let } from './Let';
import { Ref } from './Ref';
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
  // console.log('args', (args as any).params);
  // assert(isStringArray(args), 'args'); // todo(mh)

  if ('params' in args) {
    args = (args as any).params; // fixme(mh)
  }

  const f = (
    <code ask={ask || undefined} fun={!ask || undefined}>
      {args.map(({ params: [arg, type] }: any, index: any) => (
        <Let name={arg} value={<Ref name={`$${index}`} />} />
      ))}
      {expressions.length > 0 ? expressions : <call name="null" />}
    </code>
  );

  if (!name) {
    return f;
  }

  return <Let name={name} value={f} />;
}
