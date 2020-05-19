import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

type nameAndTypeTuple = [string, string];

export function Ask({
  children = [],
  args = [],
}: {
  children?: AskCodeOrValue[];
  args?: nameAndTypeTuple[];
  returns?: string;
}) {
  return (
    <fun ask args={args.map(([name]) => name)}>
      {null}
      {children}
    </fun>
  );
}
