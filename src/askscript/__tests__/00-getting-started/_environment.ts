import { Values, Resources } from '../../../askvm';
export const values: Values = {
  hello: 'Hi, this is your Ask server',
  helloD: () => "Hello, this is AskQL server! It's " + new Date().toString(),
  score: 5,
};

export const resources: Resources = {};

// TODO(mh): Add resources for query (getting-started-04,05,06.ask)
