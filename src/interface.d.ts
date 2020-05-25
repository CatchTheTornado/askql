type FirstArg<T extends (arg: any, ...rest: any[]) => any> = T extends (
  arg: infer P,
  ...rest: any[]
) => any
  ? P
  : never;

declare namespace JSX {
  interface IntrinsicElements {
    ask: FirstArg<typeof import('./askjsx').Ask>;
    call: FirstArg<typeof import('./askjsx').Call>;
    code: {
      ask?: true;
      block?: true;
      call?: true;
      children?: any | any[];
      for?: true;
      forIn?: true;
      forOf?: true;
      fragment?: true;
      fun?: true;
      get?: true;
      if?: true;
      json?: true;
      let?: true;
      node?: true;
      query?: true;
      remote?: true;
      return?: true;
      set?: true;
      while?: true;
    };
    const: FirstArg<typeof import('./askjsx').Const>;
    fragment: FirstArg<typeof import('./askjsx').Fragment>;
    fun: FirstArg<typeof import('./askjsx').Fun>;
    if: FirstArg<typeof import('./askjsx').If>;
    node: FirstArg<typeof import('./askjsx').Node>;
    query: FirstArg<typeof import('./askjsx').Query>;
    ref: FirstArg<typeof import('./askjsx').Ref>;
    return: FirstArg<typeof import('./askjsx').Return>;
    set: FirstArg<typeof import('./askjsx').Set>;
    v: { children?: any | any[] };
  }
}

declare module '*.ask' {
  const source: string;
  export default source;
}

declare module '*.pegjs' {
  const content: typeof import('pegjs').PEG;
  export = content;
}

declare module 'askvm' {
  const source: typeof import('./askvm');
  export = source;
}

declare module 'fs.promises' {
  const source: typeof import('fs/promises');
  export = source;
}

declare var runUntyped: Function;
declare var source: string;
