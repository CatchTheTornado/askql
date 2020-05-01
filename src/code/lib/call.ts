export type tvalue = tfun | string;
export type tfun = string;
export type ttype = tfun;

/** calls function by name and pass arguments */
export function call(fun: tfun, ...args: tvalue[]): tvalue {
  return `(${[fun, ...args].join(',')})`;
}
