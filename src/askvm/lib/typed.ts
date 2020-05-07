import { AskCode } from '../../askcode';

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

export const codeAny: LambdaType<any, any> = {
  name: 'code',
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

//TODO TypedValue<T> extends Resource
export type Typed<T> = { type: any; value: T };

export const basicTypes = [empty, boolean, string];

export function typed(value: any, type?: any): Typed<any> {
  if (value instanceof AskCode) {
    return { value, type: codeAny };
  }
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

export type JSONable =
  | null
  | string
  | boolean
  | number
  | JSONable[]
  | { [key: string]: JSONable };

export function untyped(value: any): any {
  if (!value) {
    return value;
  }
  if (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'number'
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(untyped);
  }

  if (typeof value == 'object' && !('value' in value)) {
    return value;
  }

  const val = value.value;
  if (Array.isArray(val)) {
    return val.map(untyped);
  }
  return untyped(val);
}
