import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function Ask({
  children = [],
}: {
  children?: AskCodeOrValue[];
  returns?: string;
}) {
  return (
    <call>
      <fun>{children}</fun>
    </call>
  );
}
