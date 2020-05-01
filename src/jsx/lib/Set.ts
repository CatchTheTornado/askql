import * as code from '../../code';
import { assert, isString, render } from './jsx';

export function Set(element: any) {
  const { name, value } = element.props;
  assert(isString(name), 'name');
  return code.set(render(value), ...name.split('.'));
}
