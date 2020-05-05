export interface Type<T> {
  name: string;
  prototype: null | Type<T>;
  validate: (value: any) => value is T;
}

export const any: Type<any> = {
  name: 'any',
  prototype: null,
  validate: (value): value is any => true,
};

export const typeType: Type<any> = {
  name: 'type',
  prototype: any,
  validate: (value): value is any => true,
};

export const empty: Type<null> = {
  name: 'empty',
  prototype: null,
  validate: (value): value is null => value == null,
};

export const boolean: Type<boolean> = {
  name: 'boolean',
  prototype: any,
  validate: (value): value is boolean => typeof value === 'boolean',
};

export const string: Type<string> = {
  name: 'string',
  prototype: any,
  validate: (value): value is string => typeof value === 'string',
};

export interface LambdaType<R, A> extends Type<(arg: A) => R> {
  retType: Type<R>;
  argType: Type<A>;
}

export const lambdaAny: LambdaType<any, any> = {
  name: 'lambda',
  retType: any,
  argType: any,
  prototype: any,
  validate: any.validate,
};

export function lambda<T, A>(
  retType: Type<T>,
  argType: Type<A>
): LambdaType<T, A> {
  return Object.assign(Object.create(lambdaAny), {
    name: 'lambda',
    retType,
    argType,
    prototype: any,
    validate: (value): value is (arg: A) => T => typeof value === 'function',
  } as LambdaType<T, A>);
}

export type Typed<T> = { type: any; value: T };

export const basicTypes = [empty, boolean, string];

export function typed(value: any, type?: any): Typed<any> {
  if (value && typeof value.type !== 'undefined') {
    // if already a typed value, don't wrap again
    return value;
  }
  if (type) {
    return { value, type };
  }
  if (value != null && typeof value.prototype !== 'undefined') {
    return { value, type: typeType };
  }
  for (let index in basicTypes) {
    if (basicTypes[index].validate(value)) {
      return { value, type: basicTypes[index] };
    }
  }
  return { value, type: any };
}
