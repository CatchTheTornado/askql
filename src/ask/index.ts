import * as lib from './lib';

export interface Scope extends Record<string, any> {}
export interface Context extends Record<string, any> {}

interface Options {
  logging?: boolean;
}

export function ask(
  source: lib.source,
  { logging = false }: Options = {}
): any {
  const stack: any[] = [];
  const context: Context = {
    stack,
    options: {
      logging,
    },
  };
  stack.push({
    scope: {
      '[[Prototype]]': lib,
      context,
    },
  });
  context.stack[0].scope.frame = stack[stack.length - 1]; // getter

  if (logging) {
    console.log(`ask ${source}`);
  }
  try {
    const result = lib.ask(source, { context });
    return result;
  } finally {
    if (logging) {
      console.log('context', context);
    }
  }
}
