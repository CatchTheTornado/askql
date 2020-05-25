import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function For({
  key,
  in: inProp,
  of: ofProp,
  children,
}: {
  key: AskCodeOrValue;
  in?: AskCodeOrValue;
  of?: AskCodeOrValue;
  children: AskCodeOrValue[];
}) {
  return (
    <code forIn={!!inProp || undefined} forOf={!!ofProp || undefined}>
      {key}
      {inProp ?? ofProp}
      <code block>{children}</code>
    </code>
  );
}
