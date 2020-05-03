import type { tvalue } from './call';

export function json(raw: any): tvalue {
  return JSON.stringify(raw);
}

export function v(raw: any): tvalue {
  return json(raw);
}
