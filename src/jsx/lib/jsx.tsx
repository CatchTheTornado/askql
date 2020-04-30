import * as c from '.';

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

class AskElement {
  constructor(readonly name: string, readonly options: AskElementOptions) {}

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

  const {
    name,
    options: { props, children },
  } = element;

  switch (name) {
    case 'call': {
      const { name = '', args = [] } = props;
      assert(isString(name), 'name');
      assert(isStringArray(args), 'args');
      return c.call(
        render(name ? <ref name={name} /> : children[0]),
        ...args.map((arg) => render(arg))
      );
    }

    case 'fragment':
      return element.renderChildren().join('');

    case 'fun': {
      const { name = '', args = [] } = props;
      assert(isString(name), 'name');
      assert(isStringArray(args), 'args');
      const fun = c.fun(args, ...element.renderChildren());
      return name ? c.set(fun, name) : fun;
    }

    case 'if': {
      const { condition } = props;
      return c.if(render(condition), {
        $then: element.renderChildren(),
        $else:
          next instanceof AskElement && next.name === 'else'
            ? next.renderChildren()
            : undefined,
      });
    }

    case 'else': // handled in if
      return '';

    case 'program':
      return c.call(c.fun([], ...element.renderChildren()));

    case 'ref': {
      const { name } = props;
      assert(isString(name), 'name');
      return c.ref(...name.split('.'));
    }

    case 'return': {
      const { value } = props;
      return c.returnUnsafe(render(value));
    }

    case 'set': {
      const { name, value } = props;
      assert(isString(name), 'name');
      return c.set(render(value), name);
    }

    default:
      throw new Error(`Unknown function "${name}" to compile in JSX`);
  }
}

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion error: ${message}`);
  }
}

function isString(value: any): value is string {
  return typeof value === 'string';
}

function isStringArray(value: any): value is string[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(isString);
}
