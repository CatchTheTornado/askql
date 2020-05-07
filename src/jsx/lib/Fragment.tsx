import * as askjsx from './jsx';
askjsx;

export function Fragment({ children = [] }: { children?: askjsx.AskNode[] }) {
  return <code fragment>{children}</code>;
}
