import { Values } from '../../../askvm';
export const values: Values = {
  score: 10,

  // for query in e2e-05-query.ask
  name: 'Lucas',
  shortName: 'Luke',
  value: 2.123456789,
  baseCurrency: 'USD',

  philosophers: [
    'Aristotle',
    'Kant',
    'Plato',
    'Russel',
    'Turing',
    'Wittgenstein',
  ],
  scorePerPhilosopher: {
    Aristotle: 385,
    Kant: 42,
    Plato: 1,
    Russel: 7331,
    Turing: 65536,
    Wittgenstein: 420,
  },
};
