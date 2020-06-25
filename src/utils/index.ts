export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion error: ${message}`);
  }
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isStringArray(value: any): value is string[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(isString);
}

export function flatten<T>(
  arr: (T | T[])[],
  options: { arrays?: boolean; objectValues?: boolean } = {}
): T[] {
  const { arrays = true, objectValues = false } = options;
  return arr.reduce<T[]>(function (result, item) {
    if (arrays && Array.isArray(item)) {
      return result.concat(flatten(item, options));
    }
    if (objectValues && item && typeof item === 'object') {
      return result.concat(flatten(Object.values(item), options));
    }
    return result.concat(item);
  }, []);
}

export function titleCase(s: string): string {
  return `${s[0].toUpperCase()}${s.slice(1)}`;
}

export async function asyncFind<T>(
  array: T[],
  callback: (item: T, index: number) => Promise<boolean>
): Promise<T | undefined> {
  const results = await Promise.all(array.map(callback));
  return array.find(({}, index) => results[index] === true);
}

export async function asyncFilter<T>(
  array: T[],
  callback: (item: T) => Promise<boolean>
): Promise<T[]> {
  const results = await Promise.all(array.map(callback));
  return array.filter(({}, index) => results[index] === true);
}

export async function asyncEvery<T>(
  array: T[],
  callback: (item: T) => Promise<boolean>
) {
  const results = await Promise.all(array.map(callback));
  return results.every((result) => result === true);
}

export async function asyncSome<T>(
  array: T[],
  callback: (item: T) => Promise<boolean>
) {
  const results = await Promise.all(array.map(callback));
  return results.some((result) => result);
}

export async function asyncMap<T, U>(
  array: T[],
  callback: (item: T) => Promise<U>
): Promise<U[]> {
  let result: U[] = [];
  for (let item of array) {
    result.push(await callback(item));
  }
  return result;
}

export function fromEntries<T>(
  iterable: Iterable<[string, T]>
): Record<string, T> {
  const record: Record<string, any> = {};
  [...iterable].forEach(([key, val]) => {
    record[key] = val;
  });
  return record;
}
