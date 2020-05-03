import { call } from './call';
import type { tvalue } from './call';
import { json } from './json';

/** evaluate */
export function ask(source: string): tvalue {
  return call(json('ask'), json(source));
}
