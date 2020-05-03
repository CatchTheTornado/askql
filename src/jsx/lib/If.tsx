import { Else } from './Else';
import * as jsx from './jsx';
import { AskElement } from './jsx';
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
      <v>if</v>
      {condition}
      <fun>{$then}</fun>
      <fun>{$else}</fun>
    </call>
  );
}
