import { value, call } from './call';
import { string } from './string';

/** evaluate */
export function ask(source: string): value {
  return call(string('ask'), string(source));
}
