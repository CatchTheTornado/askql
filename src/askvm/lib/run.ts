import { AskCodeOrValue, isValue, AskCode } from '../../askcode';
import { Resources } from './resource';
import { JSONable, typed, Typed, untyped } from './typed';

export interface Options {
  resources: Resources;
}

export function run(
  options: Options,
  code: AskCodeOrValue,
  args?: any[]
): Typed<JSONable> {
  const { resources: scope } = options;
  if (isValue(code) || Array.isArray(code) || !(code instanceof AskCode)) {
    return typed(code);
  }

  if (!scope) {
    throw new Error('No scope!');
  }

  const name = code.name as keyof typeof scope;
  if (!(name in scope)) {
    throw new Error(`Unknown resource ${code.name}!`);
  }

  const res = scope[name];

  if (res.type?.name === 'code' && args) {
    const code = ((res as any) as Typed<any>).value as AskCodeOrValue;
    return run(options, code, args);
  }

  if (res.compute) {
    return typed(res.compute(options, code, args?.map(typed)));
  }

  // Typed
  if (res.type) {
    return (res as any).value;
  }

  console.log(res);

  throw new Error('Unhandled resource!');
}

export function runUntyped(
  options: Options,
  code: AskCodeOrValue,
  ...args: any[]
): JSONable {
  return untyped(run(options, code, ...args));
}
