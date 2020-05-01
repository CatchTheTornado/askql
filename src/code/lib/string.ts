import type { tvalue } from './call';

export function string(raw: string): tvalue {
  return JSON.stringify(raw);
}
