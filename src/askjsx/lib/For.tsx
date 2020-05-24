import * as askjsx from './jsx';
import { AskCodeOrValue } from '../../askcode';
import { Values } from '../../askvm';
askjsx;

export function For({
  key,
  in: inProp,
  children,
}: {
  key: AskCodeOrValue;
  in: AskCodeOrValue;
  children: AskCodeOrValue[];
}) {
  return (
    <code for>
      {key}
      {inProp}
      {children}
    </code>
  );
}
