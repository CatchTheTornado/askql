import { Resources, resource } from '../../../askvm';
import * as type from '../../../askvm/lib/type';
import { Values } from '../../../askvm';

export const values: Values = {
  hello: 'Hello! This is your local Ask server.',

  n: 1.9,
  a: 5,
  b: 10,
};

export const resources: Resources = {
  factorial: resource<number, [number]>({
    type: type.int,
    resolver: async (n: number): Promise<number> => {
      function factorial(n: number): number {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
      }
      return factorial(n);
    },
  }),
};
