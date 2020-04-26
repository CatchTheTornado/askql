type value = string;
type fun = string;
type type = fun;

export function string(raw: string): string {
  return `s(${JSON.stringify(raw)})`; // escaping?
}

/** calls function by name and pass arguments */
export function call(name: string, ...args: value[]): value {
  return `c(${[string(name), ...args].join(',')})`;
}

/** evaluate */
function ask(source: string): string {
  return call('ask', string(source));
}

/** reference value (possibly nested) */
export function ref(...keys: value[]): value {
  return call('r', ...keys);
}

/** create function which has no type checking */
export function funUnsafe(body: string, ...args: value[]): fun {
  return call('f', string(body), ...args);
}
