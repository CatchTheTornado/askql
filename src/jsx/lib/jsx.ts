import { call, fun, ref, set, string } from '../../code';

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
    case 'ask':
      return call(fun(...element.renderChildren()));

    case 'call': {
      const { name = '', args = [] } = props;
      assert(isString(name), 'name');
      assert(isStringArray(args), 'args');
      return call(
        name ? ref(...name.split('.')) : render(children[0]),
        ...args.map((arg) => render(arg))
      );
    }

    case 'fragment':
      return element.renderChildren().join('');

    case 'fun': {
      const { name = '', args = [] } = props;
      assert(isString(name), 'name');
      assert(isStringArray(args), 'args');

      const expressions = element.renderChildren();
      if (expressions.length === 0) {
        throw new Error('Functions need to have at least one expression');
      }
      const f = fun(
        ...args.map((arg, index) =>
          set(ref('frame', 'args', String(index)), arg)
        ),
        ...expressions
      );
      return name ? set(f, name) : f;
    }

    case 'if': {
      const { condition } = props;
      const $then = element.renderChildren();
      const $else =
        next instanceof AskElement && next.name === 'else'
          ? next.renderChildren()
          : [];

      return call(
        string('if'),
        render(condition),
        fun(...$then),
        fun(...$else)
      );
    }

    case 'else': // handled in if
      return '';

    case 'ref': {
      const { name } = props;
      assert(isString(name), 'name');
      return ref(...name.split('.'));
    }

    case 'return': {
      const { value } = props;
      return set(render(value), 'frame', 'returnedValue');
    }

    case 'set': {
      const { name, value } = props;
      assert(isString(name), 'name');
      return set(render(value), ...name.split('.'));
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
