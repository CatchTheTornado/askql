import { AskCode, AskCodeOrValue, isAskCode, toAskCode } from '../../askcode';
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
 * Returns the result of evaluating `code`. For simple values, returns them
 * and for resources it runs them.
 * @param options the runtime environment options
 * @param code resource call (AskCode instance) or a simple value
 * @param args optional runtime arguments (apply in case of code has no params of its own)
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
      // calling the resource referenced by the value with the arguments
      return run(options, value as AskCode, args);
    }

    return value;
  }

  if (name in resources) {
    if (!(resources[name] instanceof Resource)) {
      // console.error('resource', resources[name]);
      throw new Error(`Invalid resource "${name}"`);
    }

    if (!code.params && !args) {
      // this resource is just being referenced, so we return the AskCode
      return typed(code);
    }

    const codeWithArgs = code.params
      ? code
      : toAskCode({ ...code, params: args });

    // console.log(
    //   'computing',
    //   codeWithArgs.name,
    //   codeWithArgs.params,
    //   'args:',
    //   args
    // );
    return typed(await resources[name].compute(options, codeWithArgs, args));
  }

  // console.log('resources', resources);
  // console.log('values', values);
  throw new Error(`Unknown identifier '${name}'!`);
}

export async function runUntyped(
  options: Options,
  code: AskCodeOrValue,
  args?: any[]
): Promise<JSONable> {
  return untyped(await run(options, code, args));
}
