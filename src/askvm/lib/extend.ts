import { Options, Values } from './run';

interface Extendable {
  prototype?: Extendable;
}

export function extend<T extends Proto, Proto extends Extendable | undefined>(
  prototype: Proto,
  options: Partial<T> & Omit<T, keyof Proto>,
  ...extraOptions: Partial<T>[]
): T {
  return Object.assign(
    Object.create(prototype ?? null),
    {
      prototype,
    },
    options,
    ...extraOptions
  );
}

export function extendOptions(
  prototype: Options,
  ...options: Options[]
): Options {
  return extend<Options, Options>(
    prototype,
    {
      values: extend(prototype.values, {}),
    } as Partial<Options>,
    ...options
  );
}
