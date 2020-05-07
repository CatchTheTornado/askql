import { AskCodeOrValue } from '../../askcode';
import { Call } from './Call';
import { Fun } from './Fun';
import * as askjsx from './jsx';
askjsx;

export function Ask({ children = [] }: { children?: AskCodeOrValue[] }) {
  return (
    <Call>
      <Fun>{children}</Fun>
    </Call>
  );
}
