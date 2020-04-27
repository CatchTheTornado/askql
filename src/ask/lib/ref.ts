import type { Context } from '..';

export function ref(context: Context, ...keys: string[]): any {
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
