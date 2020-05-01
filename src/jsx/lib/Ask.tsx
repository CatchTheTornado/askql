import * as jsx from './jsx';
jsx;

export function Ask({ children = [] }: { children?: jsx.AskNode[] }) {
  return (
    <call>
      <fun>{children}</fun>
    </call>
  );
}
