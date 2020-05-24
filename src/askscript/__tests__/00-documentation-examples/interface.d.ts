declare module 'documentation01-complete_example.ask' {}

declare var runUntyped: Function;
declare var source: string;

declare module '*.ask' {
  const value: Function;
  export = value;
}
