import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function If({
  condition,
  children,
  ...props
}: {
  condition: AskCodeOrValue;
  children?: AskCodeOrValue[];
  else?: AskCodeOrValue | AskCodeOrValue[];
  then?: AskCodeOrValue | AskCodeOrValue[];
}) {
  return (
    <code if>
      {condition}
      <code block>{props.then ?? children}</code>
      <code block>{props.else ?? []}</code>
    </code>
  );
}
