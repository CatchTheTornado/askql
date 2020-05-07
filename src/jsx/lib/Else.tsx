import { Fragment } from './Fragment';
import * as askjsx from './jsx';
askjsx;

export function Else({ children = [] }: { children?: askjsx.AskNode[] }) {
  return <Fragment>{children}</Fragment>;
}
