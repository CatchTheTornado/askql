import { assert, isString } from '../../utils';
import * as jsx from './jsx';
jsx;

export function Ref({ name }: { name: string }) {
  assert(isString(name), 'name');
  return <code ref>{name.split('.')}</code>;
}
