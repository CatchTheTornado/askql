import * as code from '../../code';
import { assert, flatten } from '../../utils';

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
): AskElement | string {
  const props = propsOrNull || {};

  if (typeof name === 'string') {
    // direct reference to AskCode
    assert(
      Object.keys(props).length === 0,
      'AskCode element props should be empty'
    );

    // AskCode functions accept simple arguments only, so it's okay to flatten
    // also render children if necessary
    const flatChildren = flatten(children);
    return (code as any)[name](
      ...flatten(children).map((node, index) =>
        render(node, {
          prev: flatChildren[index - 1],
          next: flatChildren[index + 1],
        })
      )
    );
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
  if (typeof element === 'string') {
    return element;
  }

  assert(
    element instanceof AskElement,
    'You can only render AskElements or string values'
  );

  const { type, props, children } = element;
  const result = type.call(null, { ...props, children }, options);
  return jsx('fragment', null, flatten([result])) as string;
}
