import type { Context } from '..';
import { ref } from './ref';

export function set(context: Context, value: any, ...keys: string[]): void {
  const key = keys.pop()!;
  ref(context, ...keys)[key] = value;
}
