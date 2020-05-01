import { assert, isString } from '../../utils';
import * as jsx from './jsx';
import { render } from './jsx';

jsx;

export function Set({ name, value }: { name: string; value: string }) {
  assert(isString(name), 'name');
  return (
    <set>
      {render(value)}
      {name.split('.')}
    </set>
  );
}
