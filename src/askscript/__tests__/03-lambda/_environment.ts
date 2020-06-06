import { AskCode } from '../../../askcode';
import {
  resource,
  Resources,
  Values,
  Options,
  runUntyped,
} from '../../../askvm';
export const values: Values = {
  score: 5.1,
  text: 'Hello, this is me',
};

export const resources: Resources = {
  useFor: resource<any, [any, AskCode]>({
    // resolver: async (value: any, code: AskCode): Promise<any> => {
    //   console.log('!', value, code);
    //   // return run;
    //   // return ':' + s + ':';
    //   return '5';
    // },
    async compute(
      options: Options,
      code: AskCode,
      args?: [any, AskCode]
    ): Promise<any> {
      const [valueChild, funChild, ...callParams] = code.params!;
      console.log(1);
      const value = await runUntyped(options, valueChild, []);
      console.log(2);
      console.log({ funChild, valueChild, value });

      // console.log('!', code, args);
      // if (!args) {
      //   return code;
      // }
      // const [value, askCode] = args;
      return runUntyped(options, funChild, [value]);
    },
  }),
};
