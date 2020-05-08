import * as askjsx from './jsx';
askjsx;

export function Return({ value }: { value: string }) {
  return <code return>{value}</code>;
}
