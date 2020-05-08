import { resource } from '../../lib/resource';
import { lambda, string, Typed, typed } from '../../lib/typed';

type Value = Typed<any>;

export const at = resource<Value>({
  type: lambda(string, string),
  async resolver(listOrObject: any, key: any): Promise<any> {
    return typed(listOrObject[key]);
  },
});
