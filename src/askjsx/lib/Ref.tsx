import { assert, isString } from '../../utils';
import * as askjsx from './jsx';
askjsx;

export function Ref({ name }: { name: string }) {
  assert(isString(name), 'name');
  return (
    <code get>
      {name.split('.').map((name) => (
        <v>{name}</v>
      ))}
    </code>
  );
}
