import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

export function Struct({ children = [] }: { children?: AskCodeOrValue[] }) {
  return <code object>{children}</code>;
}
