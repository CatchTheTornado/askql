import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function While({
  condition,
  args,
}: {
  condition: AskCodeOrValue;
  args: AskCodeOrValue;
  children: AskCodeOrValue[];
}) {
  return (
    <code while>
      {condition}
      {args}
    </code>
  );
}
