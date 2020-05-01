import { call } from './call';
import type { tvalue } from './call';
import { string } from './string';

/** evaluate */
export function ask(source: string): tvalue {
  return call(string('ask'), string(source));
}
