import * as askjsx from './jsx';
import { AskCodeOrValue } from '../../askcode';
import { Values } from '../../askvm';
askjsx;

export function Remote({
  url,
  values,
  children,
}: {
  url: string;
  values: Values;
  children: AskCodeOrValue[];
}) {
  return (
    <code remote>
      {url}
      {values}
      {children}
    </code>
  );
}
