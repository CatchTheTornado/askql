import * as code from '../../code';
import { AskElement, render } from './jsx';
import { Else } from './Else';

export function If(element: any, next: any) {
  const { condition } = element.props;
  const $then = element.renderChildren();
  const $else =
    next instanceof AskElement && (next.name as any) === Else
      ? next.renderChildren()
      : [];

  return code.call(
    code.string('if'),
    render(condition),
    code.fun(...$then),
    code.fun(...$else)
  );
}
