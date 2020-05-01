import * as jsx from './jsx';
import { assert, isString, isStringArray, render } from './jsx';
jsx;

export function Call({ props, children }: any) {
  const { name = '', args = [] } = props;
  assert(isString(name), 'name');
  assert(isStringArray(args), 'args');
  const callArgs = [
    name ? <ref>{name.split('.')}</ref> : render(children[0]),
    ...args.map((arg) => render(arg)),
  ];
  return <call>{callArgs}</call>;
}
