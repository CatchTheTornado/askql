import * as c from '.';

export function jsx(
  name: string,
  propsOrNull: Record<string, any> | null,
  ...children: string[]
): string {
  const props = propsOrNull || {};
  switch (name) {
    case 'call': {
      const { fun = children[0], args = [] } = props;
      return c.call(fun, ...args);
    }

    case 'fun':
      const { args = [] } = props;
      return c.fun(args, ...children);

    case 'if':
      const { condition } = props;
      return c.if(condition, { $then: children });

    case 'ref': {
      const { id } = props;
      return c.ref(...id.split('.'));
    }

    case 'return': {
      const { value } = props;
      return c.returnUnsafe(value);
    }

    case 'set': {
      const { id } = props;
      return c.set(children[0], ...id.split('.'));
    }

    case 'string':
      return c.string(children[0]);

    default:
      throw new Error(`Unknown function "${name}" to compile in JSX`);
  }
}
