import type { Context } from '..';
import { funtype } from './fun';
import { ref } from './ref';

export type source = string;

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
  let fun: string | funtype = evaluate($fun, {
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
