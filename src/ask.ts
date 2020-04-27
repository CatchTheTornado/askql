type source = string;

interface Context extends Record<string, any> {}

interface Options {
  logging?: boolean;
}

export function ask(source: source, { logging = false }: Options = {}): any {
  const context: Context = {
    s: set,
    r: ref,
    f: fun,
    ask: evaluate,
    stack: [],
    options: {
      logging,
    },
  };

  if (logging) {
    console.log(`ask ${source}`);
  }
  try {
    const result = evaluate(source, { context });
    return result;
  } finally {
    if (logging) {
      console.log('context', context);
    }
  }
}

interface EvaluateOptions {
  context: Record<string, any>;
  operation?: string;
}

/** ask program is a function call */
export function evaluate(
  source: source,
  { context, operation = 'call' }: EvaluateOptions
): any {
  if (source[0] !== '(') {
    return JSON.parse(source);
  }

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

  const description = `${operation} ${name}(${args.join(', ')})`;
  try {
    if (context.options.logging) {
      console.log(`${description} -> ...`);
    }
    const result = call(context, args);
    if (context.options.logging) {
      console.log(`${description} -> ${result}`);
    }
    return result;
  } catch (error) {
    console.error(description, error.message, context.stack);
    throw error;
  }
}

function call(context: Context, [$fun, ...$args]: source[]): any {
  let fun: string | Function = evaluate($fun, {
    operation: 'function',
    context,
  });

  if (typeof fun === 'string') {
    const key = fun;
    fun = ref(context, key);
    if (typeof fun !== 'function') {
      throw new Error(
        `Key "${key}" in context has type "${typeof fun}" which is not callable`
      );
    }
  }

  if (typeof fun !== 'function') {
    throw new Error(`Expression "${typeof fun}" is not callable`);
  }

  const args = $args.map(($arg, index) =>
    evaluate($arg, { operation: `arg#${index}`, context })
  );

  const frame = {
    args,
  };
  context.stack.push(frame);
  context.frame = frame;

  if ('args' in fun) {
    context.args = args;
  }

  const result = fun.call(null, context, ...args);

  context.stack.pop();
  return result;
}

function set(context: Context, key: string, value: any): void {
  context[key] = value;
}

function ref(context: Context, ...keys: string[]): any {
  if (keys.length === 0 || keys[0] === 'context') {
    return context;
  }
  const key = keys.pop()!;
  const object = ref(context, ...keys);
  if (!(key in object)) {
    throw new Error(`Missing "${key}" in the object`);
  }
  return object[key];
}

function fun(context: Context, ...expressions: source[]): () => any {
  return Object.assign(
    () => {
      let result;
      expressions.forEach((expr) => {
        result = evaluate(expr, { operation: 'function call', context });
      });
      return result;
    },
    {
      args: true,
    }
  );
}
