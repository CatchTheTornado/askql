declare module 'fs.promises' {
  const source: typeof import('fs/promises');
  export = source;
}
