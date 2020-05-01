import * as code from '../../code';
import { assert } from '../../utils';

type JSONable =
  | string
  | boolean
  | number
  | null
  | Record<string, any /* JSONable */>
  | Array<any /* JSONable */>;
export type AskNode = AskElement | JSONable;

export class AskElement {
  constructor(
    readonly type: Function,
    readonly props: Record<string, AskNode>,
    readonly children: AskNode[]
  ) {}

  render(options: AskJSXRenderOptions): string {
    return this.type.call(
      null,
      {
        ...this.props,
        children: this.renderChildren(),
      },
      options
    );
  }

  renderChildren(): string[] {
    return this.children.map((child, index) =>
      render(child, {
        parent: this,
        prev: this.children[index - 1],
        next: this.children[index + 1],
      })
    );
  }
}

export function jsx(
  name: string,
  propsOrNull: Record<string, AskNode> | null,
  ...children: AskNode[]
): AskElement {
  const props = propsOrNull || {};

  if (typeof name === 'string') {
    // direct reference to AskCode
    assert(
      Object.keys(props).length === 0,
      'AskCode element props should be empty'
    );

    // AskCode functions accept simple arguments only, so it's okay to flatten
    const flatChildren = ([] as AskNode[]).concat.apply([], children);
    return (code as any)[name](...flatChildren);
  }

  return new AskElement(name, props, children);
}

export interface AskJSXRenderOptions {
  parent?: AskElement;
  prev?: AskNode;
  next?: AskNode;
}

export function render(
  element: AskNode,
  options: AskJSXRenderOptions = {}
): string {
  if (!(element instanceof AskElement)) {
    return JSON.stringify(element);
  }
  return element.render(options);
}
