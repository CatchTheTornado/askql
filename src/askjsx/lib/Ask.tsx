import * as jsx from './jsx';
import { Call } from './Call';
import { Fun } from './Fun';
jsx;

export function Ask({ children = [] }: { children?: jsx.AskNode[] }) {
  return (
    <Call>
      <Fun>{children}</Fun>
    </Call>
  );
}
