import { Values, Resources } from '../../../askvm';
export const values: Values = {
  hello: 'Hi, this is your Ask server',
  helloD: () => "Hello, this is AskQL server! It's " + new Date().toString(),
  score: 5,
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
};

export const resources: Resources = {};
