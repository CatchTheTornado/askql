import { assert, isString } from '../../utils';
import * as jsx from './jsx';
jsx;

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
