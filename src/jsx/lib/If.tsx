import { Else } from './Else';
import * as askjsx from './jsx';
import { AskElement } from './jsx';
askjsx;

export function If(
  {
    condition,
    children = [],
  }: { condition: string; children?: askjsx.AskNode | askjsx.AskNode[] },
  { next }: askjsx.AskJSXRenderOptions
) {
  const $then = children;
  const $else =
    next instanceof AskElement && next.type === Else
      ? next.renderChildren()
      : [];

  return (
    <code call>
      <code json>if</code>
      {condition}
      <code fun>{$then}</code>
      <code fun>{$else}</code>
    </code>
  );
}
