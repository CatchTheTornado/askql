import { AskCode } from '../../askcode';

export class Type<T> {
  constructor(...options: (Partial<Type<T>> | undefined)[]) {
    Object.assign(this, ...options);
  }

  name: string = 'any!';
  prototype: null | Type<any> = null;
  validate(value: any): value is T {
    return true;
  }
}

export type { LambdaType };

// TODO rename -> extend
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

export const askCode = code;

interface UnionType<T = any> extends Type<T> {
  types: any[];
}

const unionAny = type<UnionType<any>, Type<any>>(any, {
  name: 'union',
  validate(value): value is any {
    if (this === unionAny) {
      return true;
    }
    return this.types.some((type) => validate(type, value));
  },
  types: [],
});

interface UnionType2<A, B> extends UnionType<A | B> {
  types: [Type<A>, Type<B>];
}

export function union2<A, B>(a: Type<A>, b: Type<B>): UnionType2<A, B> {
  return type<UnionType2<A, B>, UnionType>(unionAny, {
    types: [a, b],
  });
}

interface UnionType3<A, B, C> extends UnionType<A | B | C> {
  types: [Type<A>, Type<B>, Type<C>];
}

export function union3<A, B, C>(
  a: Type<A>,
  b: Type<B>,
  c: Type<C>
): UnionType3<A, B, C> {
  return type<UnionType3<A, B, C>, UnionType>(unionAny, {
    types: [a, b, c],
  });
}

interface UnionType4<A, B, C, D> extends UnionType<A | B | C | D> {
  types: [Type<A>, Type<B>, Type<C>, Type<D>];
}

export function union4<A, B, C, D>(
  a: Type<A>,
  b: Type<B>,
  c: Type<C>,
  d: Type<D>
): UnionType4<A, B, C, D> {
  return type<UnionType4<A, B, C, D>, UnionType>(unionAny, {
    types: [a, b, c, d],
  });
}

interface ArrayType<T> extends Type<T[]> {
  itemType: Type<T>;
}

const arrayAny = type<ArrayType<any>, Type<any>>(any, {
  name: 'array',
  validate(value): value is any[] {
    if (!Array.isArray(value)) {
      return false;
    }
    return value.every((value) => validate(this.itemType, value));
  },
  itemType: any,
});

export function array<T>(itemType: Type<T>): ArrayType<T> {
  return type<ArrayType<T>, ArrayType<any>>(arrayAny, {
    itemType,
  });
}

interface RecordType<T> extends Type<Record<string, T>> {
  itemType: Type<T>;
}

const recordAny = type<RecordType<any>, Type<any>>(any, {
  name: 'array',
  validate(value): value is Record<string, any> {
    if (value == null || typeof value !== 'object') {
      return false;
    }
    return Object.values(value).every((value) =>
      validate(this.itemType, value)
    );
  },
  itemType: any,
});

export function record<T>(itemType: Type<T>): RecordType<T> {
  return type<RecordType<T>, RecordType<any>>(recordAny, {
    itemType,
  });
}

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
