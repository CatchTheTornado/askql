import * as code from '../../code';
import { assert, flatten, titleCase } from '../../utils';
import * as components from './';

type JSONable =
  | string
  | boolean
  | number
  | null
  | Record<string, any /* JSONable */>
  | Array<any /* JSONable */>;
export type AskNode = AskElement;

export type Props = Record<string, AskNode | JSONable>;

export class AskElement {
  constructor(
    readonly type: Function,
    readonly props: Props,
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
  name: string | Function,
  propsOrNull: Props | null,
  ...children: AskNode[]
): AskElement | string {
  const props = propsOrNull || {};

  if (typeof name === 'function') {
    return new AskElement(name, props, children);
  }

  if (name !== 'code' && name !== 'v') {
    return new AskElement(
      (components as any)[titleCase(name)],
      props,
      children
    );
  }

  function callCode(name: string) {
    const flatChildren = flatten(children); // codes always have flat argument list
    return (code as any)[name](
      ...flatten(children).map((node, index) =>
        render(node, {
          prev: flatChildren[index - 1],
          next: flatChildren[index + 1],
        })
      )
    );
  }

  if (name === 'v') {
    return callCode('json');
  }

  // direct reference to AskCode
  const keys = Object.keys(props);
  assert(
    keys.length === 1 && props[keys[0]] === true,
    'AskCode element should contain exactly one prop - the name of the code and its arguments in children'
  );
  return callCode(keys[0]);
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
  return jsx('code', { fragment: true }, ...flatten([result])) as string;
}
