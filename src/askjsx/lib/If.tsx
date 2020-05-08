import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function If({
  condition,
  children,
  ...props
}: {
  condition: string;
  children?: AskCodeOrValue[];
  else?: AskCodeOrValue | AskCodeOrValue[];
  then?: AskCodeOrValue | AskCodeOrValue[];
}) {
  return (
    <code if>
      {condition}
      <code fun>{props.then ?? children}</code>
      <code fun>{props.else}</code>
    </code>
  );
}
