import { AskCodeOrValue, isValue, AskCode } from '../../askcode';
import { Resources } from './resource';
import { JSONable, typed, Typed, untyped } from './typed';

type Values = Record<string, any>;
export interface Options {
  resources?: Resources;
  values?: Values;
}

export async function run(
  options: Options,
  code: AskCodeOrValue,
  args?: any[]
): Promise<Typed<JSONable>> {
  const { resources = {}, values = {} } = options;
  if (isValue(code) || Array.isArray(code) || !(code instanceof AskCode)) {
    return typed(code);
  }

  if (!resources) {
    throw new Error('No resources!');
  }

  const name = code.name as keyof typeof resources;
  const res = resources[name] ?? typed(values[name]);
  if (!res) {
    throw new Error(`Unknown resource ${code.name}!`);
  }

  if (res.type?.name === 'code' && args) {
    const code = ((res as any) as Typed<any>).value as AskCodeOrValue;
    return await run(options, code, args);
  }

  if (res.compute) {
    return typed(await res.compute(options, code, args?.map(typed)));
  }

  // Typed
  if (res.type) {
    if ((res as any).value === undefined) {
      throw new Error(`Unknown resource ${code.name}!`);
    }
    return (res as any).value;
  }

  throw new Error('Unhandled resource!');
}

export async function runUntyped(
  options: Options,
  code: AskCodeOrValue,
  ...args: any[]
): Promise<JSONable> {
  return untyped(await run(options, code, ...args));
}
