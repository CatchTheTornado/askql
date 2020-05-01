import * as jsx from './jsx';
import { assert, isString, render } from './jsx';
jsx;

export function Set(element: any) {
  const { name, value } = element.props;
  assert(isString(name), 'name');
  return (
    <set>
      {render(value)}
      {name.split('.')}
    </set>
  );
}
