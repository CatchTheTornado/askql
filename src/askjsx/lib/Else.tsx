import * as jsx from './jsx';
import { Fragment } from './Fragment';
jsx;

export function Else({ children = [] }: { children?: jsx.AskNode[] }) {
  return <Fragment>{children}</Fragment>;
}
