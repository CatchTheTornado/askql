import { resource, Resources, Values } from '../../../askvm/lib';
import * as type from '../../../askvm/lib/type';

export const values: Values = {
  score: 6,
  n: 3,
  hello: 'hello!',
  a: 2.3,
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

  fun2: resource<number, [number]>({
    type: type.int,
    resolver: async (n: number): Promise<number> => {
      return n * n;
    },
  }),

  square: resource<number, [number]>({
    type: type.int,
    resolver: async (n: number): Promise<number> => {
      return n * n;
    },
  }),
};
