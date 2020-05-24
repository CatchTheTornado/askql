import { extendOptions, resource } from '../../../askvm';
import * as type from '../../../askvm/lib/type';

const fun = resource<number, [number]>({
  type: type.number,
  resolver: async (n: number): Promise<number> => {
    return n + 1;
  },
});

export = extendOptions({
  resources: {
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
  },
  values: {
    n: 3,
    priceList: [2.3, 5.4, 6.5],
  },
});
