import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function Fragment({ children = [] }: { children?: AskCodeOrValue[] }) {
  return children;
}
