import * as jsx from './';
import { assert, isString, isStringArray } from './jsx';
jsx;

export function Fun(element: any) {
  const { name = '', args = [] } = element.props;
  assert(isString(name), 'name');
  assert(isStringArray(args), 'args');

  const expressions = element.renderChildren();
  if (expressions.length === 0) {
    throw new Error('Functions need to have at least one expression');
  }
  const f = (
    <fun>
      {args.map((arg, index) => (
        <set>
          <ref>
            {'frame'}
            {'args'}
            {index}
          </ref>
          {arg}
        </set>
      ))}
      {expressions}
    </fun>
  );

  if (!name) {
    return f;
  }

  return (
    <set>
      {f}
      {name}
    </set>
  );
}
