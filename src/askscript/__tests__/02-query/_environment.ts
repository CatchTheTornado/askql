import {
  Values,
  resources as defaultResources,
  resource,
  Resources,
} from '../../../askvm';
import * as type from '../../../askvm/lib/type';

export const values: Values = {
  firstName: 'Luke',
  middleName: 'LukeLuke',
  lastName: 'Skywalker',
  parents: [
    {
      firstName: 'Padmé',
      lastName: 'Amidala',
    },
    {
      firstName: 'Anakin',
      lastName: 'Skywalker',
    },
  ],
  friends: [
    {
      id: 0,
      firstName: 'Padmé',
      lastName: 'Amidala',
    },
    {
      id: 1,
      firstName: 'Anakin',
      lastName: 'Skywalker',
    },
  ],
};

export const resources: Resources = {
  ...defaultResources,

  fun2: resource<string, [number, string, Array<number>]>({
    resolver: async (
      i: number,
      s: string,
      a: Array<number>
    ): Promise<string> => {
      return ':' + s + ':';
    },
  }),

  fun3: resource<string, [string]>({
    resolver: async (s: string): Promise<string> => {
      return '(-' + s + '-)';
    },
  }),
};
