import * as jsx from './jsx';
jsx;

export function Fragment({ children = [] }: { children?: jsx.AskNode[] }) {
  return children.join('');
}
