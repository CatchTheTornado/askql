interface Scope extends Record<string, any> {}
interface Context extends Record<string, any> {}

type source = string;
type fun = ((context: Context, ...args: any[]) => any) & {
  userSpace: boolean;
  scope: Scope;
  block: boolean;
};

interface Options {
  logging?: boolean;
}

export function ask(source: source, { logging = false }: Options = {}): any {
  const stack: any[] = [];
  const context: Context = {
    s: set,
    r: ref,
    f: fun,
    ask: evaluate,
    if: $if,
    stack,
    options: {
      logging,
    },
  };
  stack.push({
    scope: {
      '[[Prototype]]': context,
      context,
    },
  });
  context.stack[0].scope.frame = stack[stack.length - 1]; // getter

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

/** ask program is a function call or string literal */
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
  let fun: string | fun = evaluate($fun, {
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

  const stack = context.stack;
  if ('userSpace' in fun) {
    stack.push({
      fun,
      args,
      scope: fun.scope,
    });
    context.stack[0].scope.frame = stack[stack.length - 1]; // getter
  }

  const result = fun.call(null, context, ...args);

  if ('userSpace' in fun) {
    const frame = stack.pop();
    context.stack[0].scope.frame = stack[stack.length - 1]; // getter

    if (fun.block) {
      // if this was just a scoped block then carry on the returned value if any
      stack[stack.length - 1].returnedValue = frame.returnedValue;
    }
  }

  return result;
}

function set(context: Context, value: any, ...keys: string[]): void {
  const key = keys.pop()!;
  ref(context, ...keys)[key] = value;
}

function ref(context: Context, ...keys: string[]): any {
  let scope = context.stack[context.stack.length - 1].scope;
  if (keys.length === 0) {
    return scope;
  }

  let key = keys[0];
  while (scope && !(key in scope)) {
    scope = scope['[[Prototype]]'];
  }
  if (!scope) {
    throw new Error(`Missing "${key}" in the scope chain`);
  }

  let value = scope[key];
  for (let i = 1; i < keys.length; i += 1) {
    key = keys[i];
    if (!(key in value)) {
      throw new Error(`Missing "${key}" in the value referenced from scope`);
    }
    value = value[key];
  }

  return value;
}

function fun(context: Context, ...expressions: source[]): fun {
  return Object.assign(
    (context: Context) => {
      let result;
      for (let i = 0; i < expressions.length; i += 1) {
        const expr = expressions[i];

        result = evaluate(expr, {
          operation: 'function call',
          context,
        });

        if (context.stack[context.stack.length - 1].returnedValue) {
          return context.stack[context.stack.length - 1].returnedValue;
        }
      }
      return result;
    },
    {
      userSpace: true,
      scope: {
        '[[Prototype]]': context.stack[context.stack.length - 1].scope,
      },
      block: false,
    }
  );
}

function $if(context: Context, condition: any, $then: fun, $else: fun) {
  $then.block = true;
  $else.block = true;
  return condition ? $then(context) : $else(context);
}
