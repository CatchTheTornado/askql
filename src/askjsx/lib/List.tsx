import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function List({ children = [] }: { children?: AskCodeOrValue[] }) {
  return <code list>{children}</code>;
}
