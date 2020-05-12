import { AskCode } from '../../askcode';

class Type<T> {
  name!: string;
  prototype!: null | Type<any>;
  validate!: (value: any) => value is T;
}

export type { Type, LambdaType };

export function type<T extends Type<any>, Proto extends Type<any>>(
  prototype: Proto,
  options: Partial<T> & Omit<T, keyof Proto>
): T {
  return Object.assign(
    Object.create(prototype),
    {
      prototype,
    },
    options
  );
}

// TODO assert for detailed errors ?

export function validate<T>(type: Type<T>, value: T): value is T {
  if (type.prototype && !type.prototype.validate(value)) {
    return false;
  }
  return type.validate(value);
}

export const any = type<Type<any>, Type<any>>(new Type(), {
  name: 'any',
  prototype: null,
  validate: (value: any): value is any => true,
});

export const typeType = type<Type<any>, Type<any>>(any, {
  name: 'type',
  validate: (value): value is Type<any> => value instanceof Type,
});

export function isType(value: any): value is Type<any> {
  return typeType.validate(value);
}

export const empty = type<Type<any>, Type<any>>(any, {
  name: 'empty',
  validate: (value): value is null => value == null,
});

export const boolean = type<Type<boolean>, Type<any>>(any, {
  name: 'boolean',
  validate: (value): value is boolean => typeof value === 'boolean',
});

export const number = type<Type<number>, Type<any>>(any, {
  name: 'number',
  validate: (value): value is number => typeof value === 'number',
});

export const int = type<Type<number>, Type<number>>(number, {
  name: 'int',
  validate: (value): value is number => Number.isInteger(value),
});

export const float = type<Type<number>, Type<number>>(number, {
  name: 'float',
  validate: (value): value is number => value % 1 !== 0,
});

export const string = type<Type<string>, Type<any>>(any, {
  name: 'string',
  validate: (value): value is string => typeof value === 'string',
});

export const code = type<Type<AskCode>, Type<any>>(any, {
  name: 'code',
  validate: (value): value is AskCode => value instanceof AskCode,
});

interface LambdaType<T, A extends any[]> extends Type<(...args: A) => T> {
  retType: Type<T>;
  argsType: Type<A>;
}

const lambdaAny = type<LambdaType<any, any>, Type<any>>(any, {
  name: 'lambda', // TODO 'function' ?
  validate: (value): value is (...arg: any[]) => any =>
    typeof value === 'function',
  retType: any,
  argsType: any,
});

export function lambda<T, A extends any[]>(
  retType: Type<T>,
  argsType: Type<A> = any // TODO empty array
): LambdaType<T, A> {
  return type<LambdaType<T, A>, LambdaType<T, A>>(lambdaAny, {
    retType,
    argsType,
  });
}

/** ordered by specificness */
export const allTypes = [empty, boolean, int, float, number, string, lambdaAny];
