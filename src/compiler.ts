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

export function set(value: value, ...keys: string[]) {
  return call(string('s'), value, ...keys.map(string));
}

/** evaluate */
function ask(source: string): value {
  return call(string('ask'), string(source));
}

/** create function which has no type checking */
export function funUnsafe(...expressions: value[]): fun {
  return call(string('f'), ...expressions.map(string));
}

export function returnUnsafe(expression: value): value {
  return set(expression, 'frame', 'returnedValue');
}

export function fun(args: string[], ...expressions: value[]): fun {
  if (expressions.length === 0) {
    throw new Error('Functions need to have at least one expression');
  }
  return funUnsafe(
    ...args.map((arg, index) => set(ref('frame', 'args', String(index)), arg)),
    ...expressions
  );
}

export function $if(
  condition: value,
  {
    $then,
    $else = [],
  }: {
    $then: value[];
    $else?: value[];
  }
) {
  return call(
    string('if'),
    condition,
    funUnsafe(...$then),
    funUnsafe(...$else)
  );
}
