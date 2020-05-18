import { Values } from '../../../askvm';

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
