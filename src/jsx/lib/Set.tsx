import { assert, isString } from '../../utils';
import * as jsx from './jsx';
jsx;

export function Set({ name, value }: { name: string; value: string }) {
  assert(isString(name), 'name');
  return (
    <set>
      {value}
      {name.split('.')}
    </set>
  );
}
