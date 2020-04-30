export type value = fun | string;
export type fun = string;
export type type = fun;

/** calls function by name and pass arguments */
export function call(fun: fun, ...args: value[]): value {
  return `(${[fun, ...args].join(',')})`;
}
