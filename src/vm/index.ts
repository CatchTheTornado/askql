import * as lib from './lib';

export interface Scope extends Record<string, any> {}
export interface Context extends Record<string, any> {}

interface Options {
  logging?: boolean;
  resources?: Record<string, any>;
}

export function ask(
  source: lib.source,
  { logging = false, resources = {} }: Options = {}
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
      '[[Prototype]]': resources,
      ...lib,
      context,
    },
  });
  context.stack[0].scope.frame = stack[stack.length - 1]; // getter

  if (logging) {
    console.log(`ask ${source}`);
  }
  try {
    return lib.ask(source, { context });
  } finally {
    if (logging) {
      console.log('context', context);
      console.log('scope', context.stack[context.stack.length - 1]?.scope);
    }
  }
}
