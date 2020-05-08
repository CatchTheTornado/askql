type FirstArg<T extends (arg: any, ...rest: any[]) => any> = T extends (
  arg: infer P,
  ...rest: any[]
) => any
  ? P
  : never;

declare namespace JSX {
  interface IntrinsicElements {
    ask: FirstArg<typeof import('./src/askjsx').Ask>;
    call: FirstArg<typeof import('./src/askjsx').Call>;
    code: {
      ask?: true;
      call?: true;
      children?: any | any[];
      fragment?: true;
      return?: true;
      fun?: true;
      get?: true;
      if?: true;
      json?: true;
      let?: true;
      set?: true;
    };
    fragment: FirstArg<typeof import('./src/askjsx').Fragment>;
    fun: FirstArg<typeof import('./src/askjsx').Fun>;
    if: FirstArg<typeof import('./src/askjsx').If>;
    ref: FirstArg<typeof import('./src/askjsx').Ref>;
    return: FirstArg<typeof import('./src/askjsx').Return>;
    set: FirstArg<typeof import('./src/askjsx').Set>;
    v: { children?: any | any[] };
  }
}
