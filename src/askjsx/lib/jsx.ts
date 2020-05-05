import { assert, flatten, titleCase } from '../../utils';
import * as components from './';

type JSONable =
  | string
  | boolean
  | number
  | null
  | Record<string, any /* JSONable */>
  | Array<any /* JSONable */>;
export type AskNode = AskElement | string;

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

export function jsx( // TODO rename to createElement
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
    // return (code as any)[name](
    const args = flatten(children).map((node, index) =>
      render(node, {
        prev: flatChildren[index - 1],
        next: flatChildren[index + 1],
      })
    );
    if (name === 'fragment') {
      return args.join();
    }
    return `${name}(${args.join(',')})`;
  }

  if (name === 'v') {
    assert(
      children.length === 1,
      '<v /> should have exactly one child - value to transfer to VM'
    );
    return JSON.stringify(children[0]);
    // return code.json(children[0]);
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

  // TODO remove fragment
  return jsx('code', { fragment: true }, ...flatten([result])) as string;
}

interface AstNode {
  name: string;
  props: Record<string, any>;
  children: AstExpression[];
}

type AstExpression = string | AstNode;

export function load(ast: AstExpression): string | AskElement {
  if (typeof ast === 'string') {
    // TODO literals should be encapsulated
    return JSON.stringify(ast);
  }
  if (Array.isArray(ast)) {
    return ast.map(load) as any;
  }
  const props: Record<string, any> = {};
  for (let k in ast.props) {
    props[k] = load(ast.props[k]);
  }
  return jsx(ast.name, props, ...(ast.children?.map(load) ?? []));
}
