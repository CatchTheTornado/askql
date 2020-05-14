import * as askjsx from './jsx';
import { AskCodeOrValue } from '../../askcode';
askjsx;

export function Return({ value }: { value: AskCodeOrValue }) {
  return <code return>{value}</code>;
}
