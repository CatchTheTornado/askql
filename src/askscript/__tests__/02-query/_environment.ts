import { Values, resource, Resources } from '../../../askvm';

export const values: Values = {
  firstName: 'Luke',
  middleName: 'LukeLuke',
  lastName: 'Skywalker',
  fullName: 'Luke Skywalker',
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
  otherField: 'otherFieldValue',
};

export const resources: Resources = {
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

  knex: resource<string, [string]>({
    resolver: async (x: any): Promise<any> => {
      return [x];
    },
  }),

  where: resource<string, [string]>({
    resolver: async ([x]: any, ...args: any[]): Promise<any> => {
      return x;
    },
  }),
};
