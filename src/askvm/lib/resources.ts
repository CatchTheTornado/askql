import { boolean, string, lambda } from './typed';

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
  sum: {
    type: lambda(string, string),
    resolver(a: any, b: any): any {
      return String(Number(a.value) + Number(b.value));
    },
  },
};
