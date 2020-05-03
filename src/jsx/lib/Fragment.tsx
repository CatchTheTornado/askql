import * as jsx from './jsx';
jsx;

export function Fragment({ children = [] }: { children?: jsx.AskNode[] }) {
  return <code fragment>{children}</code>;
}
