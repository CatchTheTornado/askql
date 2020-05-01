import * as code from '../../code';

type JSONable =
  | string
  | boolean
  | number
  | null
  | Record<string, any /* JSONable */>
  | Array<any /* JSONable */>;
type AskNode = AskElement | JSONable;

export interface AskElementOptions {
  readonly props: Record<string, AskNode>;
  readonly children: AskNode[];
}

export class AskElement {
  constructor(readonly name: string, readonly options: AskElementOptions) {}

  get props() {
    return this.options.props;
  }

  get children() {
    return this.options.children;
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

  return new AskElement(name, { props, children });
}

export function render(
  element: AskNode,
  {
    parent,
    prev,
    next,
  }: {
    parent?: AskElement;
    prev?: AskNode;
    next?: AskNode;
  } = {}
): string {
  if (!(element instanceof AskElement)) {
    return JSON.stringify(element);
  }

  const { name } = element;

  if (typeof name === 'function') {
    return (name as Function).call(null, element, next /* if */);
  }

  switch (name) {
    default:
      throw new Error(`Unknown function "${name}" to compile in JSX`);
  }
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion error: ${message}`);
  }
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isStringArray(value: any): value is string[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(isString);
}
