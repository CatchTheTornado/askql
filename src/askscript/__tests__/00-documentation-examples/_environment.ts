import * as type from '../../../askvm/lib/type';
import { resource, Resources, Values } from '../../../askvm/lib';

export const values: Values = {
  n: 3,
  priceList: [2.3, 5.4, 6.5],
};

const fun = resource<number, [number]>({
  type: type.number,
  resolver: async (n: number): Promise<number> => {
    return n + 1;
  },
});

export const resources: Resources = {
  checkThis: resource<boolean, []>({
    type: type.boolean,
    resolver: async (): Promise<boolean> => {
      return true;
    },
  }),

  fun1: fun,
  fun2: fun,
  fun3: fun,

  doSomething: resource<void, []>({
    resolver: async (): Promise<void> => {
      console.log('I am doing something.');
    },
  }),
};
