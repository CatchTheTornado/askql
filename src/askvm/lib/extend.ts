import { Options } from './run';

interface Extendable {
  prototype?: Extendable;
}

export function extend<T extends Proto, Proto extends Extendable | undefined>(
  prototype: Proto,
  options: undefined | (Partial<T> & Omit<T, keyof Proto>),
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
      resources: extend(
        prototype.resources,
        {},
        ...options.map((option) => option.resources ?? {})
      ),
      // TODO values should be in resources and resources have resources key which cannot be set
      values: extend(
        prototype.values,
        {},
        ...options.map((option) => option.values ?? {})
      ),
    },
    ...options.map(({ resources, values, ...rest }) => rest)
  );
}
