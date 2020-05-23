import {
  resources as defaultResources,
  Resources,
  resource,
} from '../../../askvm';
import * as type from '../../../askvm/lib/type';
import { Values } from '../../../askvm';

export const values: Values = {
  hello: 'Hello! This is your local Ask server.',
};

export const resources: Resources = {
  ...defaultResources,

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
