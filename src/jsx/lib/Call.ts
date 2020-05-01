import * as code from '../../code';
import { assert, isString, isStringArray, render } from './jsx';

export function Call({ props, children }: any) {
  const { name = '', args = [] } = props;
  assert(isString(name), 'name');
  assert(isStringArray(args), 'args');
  return code.call(
    name ? code.ref(...name.split('.')) : render(children[0]),
    ...args.map((arg) => render(arg))
  );
}
