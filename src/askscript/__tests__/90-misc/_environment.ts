import { Values, Resources, resource } from '../../../askvm';

export const values: Values = {
  firstName: 'Luke',
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

  b: 5,
  c: 8,
};

export const resources: Resources = {
  check: resource<boolean, []>({
    resolver: async (): Promise<boolean> => {
      return false;
    },
  }),
};
