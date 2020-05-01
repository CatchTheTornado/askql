import { Else } from './Else';
import * as jsx from './jsx';
import { AskElement, render } from './jsx';
jsx;

export function If(element: any, next: any) {
  const { condition } = element.props;
  const $then = element.renderChildren();
  const $else =
    next instanceof AskElement && (next.name as any) === Else
      ? next.renderChildren()
      : [];

  return (
    <call>
      <string>if</string>
      {render(condition)}
      <fun>{$then}</fun>
      <fun>{$else}</fun>
    </call>
  );
}
