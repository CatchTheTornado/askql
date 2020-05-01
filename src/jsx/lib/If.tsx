import { Else } from './Else';
import * as jsx from './jsx';
import { AskElement, render } from './jsx';
jsx;

export function If(
  { condition, children = [] }: { condition: string; children?: jsx.AskNode[] },
  { next }: jsx.AskJSXRenderOptions
) {
  const $then = children;
  const $else =
    next instanceof AskElement && next.type === Else
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
