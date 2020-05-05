import { boolean, lambda } from './typed';

export const resources: Record<string, any> = {
  false: {
    type: boolean,
    resolver: () => false,
  },
  myFun: {
    type: boolean,
    resolver: () => false,
  },
  not: {
    type: lambda(boolean, boolean),
    resolver(a: boolean): boolean {
      return !a;
    },
  },
};
