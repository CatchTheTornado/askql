type fun = string;
type value = fun | string;
type type = fun;

export function string(raw: string): value {
  return JSON.stringify(raw);
}

/** calls function by name and pass arguments */
export function call(fun: fun, ...args: value[]): value {
  return `(${[fun, ...args].join(',')})`;
}

/** reference value (possibly nested) */
export function ref(...keys: string[]): value {
  return call(string('r'), ...keys.map(string));
}

export function set(key: string, value: value) {
  return call(string('s'), string(key), value);
}

/** evaluate */
function ask(source: string): value {
  return call(string('ask'), string(source));
}

/** create function which has no type checking */
export function funUnsafe(...expressions: value[]): fun {
  return call(string('f'), ...expressions.map(string));
}

export function fun(body: string, ...args: string[]): fun {
  return funUnsafe(
    ...args.map((arg, index) => set(arg, ref('args', String(index)))),
    body
  );
}
