import { Values, resource, Resources } from '../../../askvm';

export const values: Values = {
  n: 1.9,
  a: 5,
  b: 10,
  yes: 22,
  no: 11,
};

export const resources: Resources = {
  fun1: resource<number, [number]>({
    resolver: async (i: number): Promise<number> => {
      return i;
    },
  }),

  fun2: resource<number, [number]>({
    resolver: async (i: number): Promise<number> => {
      return i;
    },
  }),
};
