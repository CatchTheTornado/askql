import * as code from '../../code';
import { assert, isString, isStringArray } from './jsx';

export function Fun(element: any) {
  const { name = '', args = [] } = element.props;
  assert(isString(name), 'name');
  assert(isStringArray(args), 'args');

  const expressions = element.renderChildren();
  if (expressions.length === 0) {
    throw new Error('Functions need to have at least one expression');
  }
  const f = code.fun(
    ...args.map((arg, index) =>
      code.set(code.ref('frame', 'args', String(index)), arg)
    ),
    ...expressions
  );
  return name ? code.set(f, name) : f;
}
