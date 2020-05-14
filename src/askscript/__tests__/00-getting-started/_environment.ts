import { Values } from '../../../askvm';
export const values: Values = {
  hello: 'Hi, this is your Ask server',
  helloD: () => "Hello, this is AskQL server! It's " + new Date().toString(),
  score: 3,
};

// TODO(mh): Add resources for query (getting-started-04,05,06.ask)
