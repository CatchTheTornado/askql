import { AskCode, AskCodeOrValue, isAskCode } from '../../askcode';
import { Resource, Resources } from './resource';
import { JSONable, typed, TypedValue, untyped } from './typed';

export type Values = Record<string, any>;
export interface Options {
  code?: AskCode;
  result?: any;
  prototype?: Options;
  resources?: Resources;
  values?: Values;
}

let ops = 0;

function logValue<T>(message: string, value: T): T {
  console.log(message, value);
  return value;
}

/**
 * Returns the result of evaluating `code` as a resource. For simple values, returns them
 * and for functions it runs them.
 * @param options environment options
 * @param code resource call (AskCode instance) or a simple value
 * @param args optional arguments for call if `code` computes to a function and should be called
 */
export async function run(
  options: Options,
  code: AskCodeOrValue,
  args?: any[]
): Promise<TypedValue<JSONable>> {
  if (!isAskCode(code)) {
    return typed(code);
  }

  ops += 1;
  if (ops > 1000) {
    // throw new Error('Over ops limit!');
  }

  const { resources = {}, values = {} } = options;
  const { name } = code;

  if (name in values) {
    const value = values[name];
    if (isAskCode(value)) {
      // this is calling it with the arguments which are call arguments
      return run(options, value as AskCode, args);
    }

    return value;
  }

  if (name in resources) {
    if (!(resources[name] instanceof Resource)) {
      console.error('resource', resources[name]);
      throw new Error(`Invalid resource "${name}"`);
    }
    return typed(await resources[name].compute(options, code, args));
  }

  console.log('values', values);
  throw new Error(`Unknown identifier '${name}'!`);
}

export async function runUntyped(
  options: Options,
  code: AskCodeOrValue,
  args?: any[]
): Promise<JSONable> {
  return untyped(await run(options, code, args));
}
