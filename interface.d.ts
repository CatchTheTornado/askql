type FirstArg<T extends (arg: any, ...rest: any[]) => any> = T extends (
  arg: infer P,
  ...rest: any[]
) => any
  ? P
  : never;

declare namespace JSX {
  interface IntrinsicElements {
    ask: FirstArg<typeof import('./src/jsx').Ask>;
    call: FirstArg<typeof import('./src/jsx').Call>;
    code: {
      ask?: true;
      call?: true;
      children?: any | any[];
      fragment?: true;
      fun?: true;
      json?: true;
      ref?: true;
      set?: true;
    };
    else: FirstArg<typeof import('./src/jsx').Else>;
    fragment: FirstArg<typeof import('./src/jsx').Fragment>;
    fun: FirstArg<typeof import('./src/jsx').Fun>;
    if: FirstArg<typeof import('./src/jsx').If>;
    ref: FirstArg<typeof import('./src/jsx').Ref>;
    return: FirstArg<typeof import('./src/jsx').Return>;
    set: FirstArg<typeof import('./src/jsx').Set>;
    v: { children?: any | any[] };
  }
}
