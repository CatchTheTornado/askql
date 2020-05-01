import * as code from '../../code';
import { assert, isString } from './jsx';

export function Ref(element: any) {
  const { name } = element.props;
  assert(isString(name), 'name');
  return code.ref(...name.split('.'));
}
