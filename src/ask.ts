type source = string;

const context: Record<string, any> = {
  s: string,
  r: ref,
  c: call,
  ask: evaluate,
  options: {},
};
context.context = context;

interface Options {
  logging: boolean;
}

export function ask(
  source: source,
  { logging = false }: Partial<Options> = {}
): any {
  context.options = { logging };
  if (logging) {
    console.log(`ask ${source}`);
  }
  return evaluate(source);
}

/** ask program is a function call */
export function evaluate(source: source, operation: string = 'call'): any {
  let level = 0;
  let buffer = [];
  let name: string = '';
  let args: source[] = [];
  for (let i = 0; i < source.length; i += 1) {
    const c = source[i];
    switch (c) {
      case '(':
        level += 1;
        if (level === 1) {
          name = buffer.join('');
          buffer = [];
          continue;
        }
        break;

      case ',':
      case ')':
        if (c === ')') {
          level -= 1;
        }
        if ((level === 1 && c === ',') || (level === 0 && c === ')')) {
          args.push(buffer.join(''));
          buffer = [];
          continue;
        }
        break;
    }
    buffer.push(c);
  }

  // TODO place new frame on stack in context
  const description = `${operation} ${name}(${args.join(', ')})`;
  try {
    const result = context[name].call(null, ...args);
    if (context.options.logging) {
      console.log(`${description} -> ${result}`);
    }
    return result;
  } catch (error) {
    console.error(description, error);
    throw error;
  }
}

function string(raw: source): string {
  const value = JSON.parse(raw);
  if (typeof value !== 'string') {
    throw new Error('Invalid string');
  }
  return value;
}

// TODO support more keys for deep lookup
function ref(key: source): any {
  if (key === 'context') {
    return context;
  }
  const name = evaluate(key, 'reference');
  if (!(name in context)) {
    throw new Error(`Missing "${name}" in the context`);
  }
  return context[name];
}

function call(name: source, ...args: source[]): any {
  const value = ref(name);
  if (typeof value !== 'function') {
    const key = evaluate(name, 'function name');
    throw new Error(
      `Key "${key}" in context has type "${typeof value}" which is not callable`
    );
  }

  return value.call(
    null,
    ...args.map((arg, index) => evaluate(arg, `arg at index ${index}`))
  );
}
