import { AST, parse } from './parse';
import { print } from './print';

export const languages = [
  {
    name: 'AskScript',
    parsers: ['askscript'],
    extensions: ['.ask'],
  },
];

export const parsers = {
  askscript: {
    parse,
    astFormat: 'askscript-ast',
    locStart(node: AST): number {
      console.log('locStart', node);
      return 0;
    },
    locEnd(node: AST): number {
      console.log('locEnd', node);
      return 0;
    },
  },
};

export const printers = {
  'askscript-ast': {
    print,
  },
};
