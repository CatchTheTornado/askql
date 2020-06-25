import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function While({
  condition,
  children,
}: {
  condition: AskCodeOrValue;
  children?: AskCodeOrValue[];
}) {
  return (
    <code while>
      {condition}
      <code block>{children}</code>
    </code>
  );
}
