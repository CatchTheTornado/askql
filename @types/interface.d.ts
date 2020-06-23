type FirstArg<T extends (arg: any, ...rest: any[]) => any> = T extends (
  arg: infer P,
  ...rest: any[]
) => any
  ? P
  : never;

declare namespace JSX {
  interface IntrinsicElements {
    ask: FirstArg<typeof import('../src/askjsx').Ask>;
    call: FirstArg<typeof import('../src/askjsx').Call>;
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
      list?: true;
      node?: true;
      object?: true;
      query?: true;
      remote?: true;
      return?: true;
      set?: true;
      while?: true;
    };
    assign: FirstArg<typeof import('../src/askjsx').Assign>;
    const: FirstArg<typeof import('../src/askjsx').Const>;
    fragment: FirstArg<typeof import('../src/askjsx').Fragment>;
    fun: FirstArg<typeof import('../src/askjsx').Fun>;
    if: FirstArg<typeof import('../src/askjsx').If>;
    let: FirstArg<typeof import('../src/askjsx').Let>;
    node: FirstArg<typeof import('../src/askjsx').Node>;
    query: FirstArg<typeof import('../src/askjsx').Query>;
    ref: FirstArg<typeof import('../src/askjsx').Ref>;
    return: FirstArg<typeof import('../src/askjsx').Return>;
    struct: FirstArg<typeof import('../src/askjsx').Struct>;
    while: FirstArg<typeof import('../src/askjsx').While>;
    v: { children?: any | any[] };
  }
}

declare module '*.ask' {
  const source: Function;
  export default source;
}

declare module '*.pegjs' {
  const content: typeof import('pegjs').PEG;
  export = content;
}

declare module 'askvm' {
  const source: typeof import('../src/askvm');
  export = source;
}

declare module 'fs.promises' {
  const source: typeof import('fs/promises');
  export = source;
}
