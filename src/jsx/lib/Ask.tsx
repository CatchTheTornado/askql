import { Call } from './Call';
import { Fun } from './Fun';
import * as askjsx from './jsx';
askjsx;

export function Ask({ children = [] }: { children?: askjsx.AskNode[] }) {
  return (
    <Call>
      <Fun>{children}</Fun>
    </Call>
  );
}
