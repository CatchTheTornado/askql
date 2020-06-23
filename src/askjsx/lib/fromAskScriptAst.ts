import type { AskScriptAst } from '../../askscript';

type AstReducer<U> = {
  object: (
    name: string | Function,
    propsOrNull: Record<string, U> | null,
    ...children: U[]
  ) => U;
  literal: (s: null | boolean | string | number) => U;
};

export function fromAskScriptAst<U>(
  ast: AskScriptAst,
  reducer: AstReducer<U>
): U {
  if (Array.isArray(ast)) {
    return reducer.object(
      'list',
      null,
      ...ast.map((ast) => fromAskScriptAst(ast, reducer))
    );
  }

  if (ast == null || typeof ast !== 'object') {
    return reducer.literal(ast);
  }

  if ('jsxValue' in ast) {
    const value = ast.jsxValue;
    if (value == null || typeof value !== 'object') {
      return reducer.literal(value);
    }
    const object = value;
    const objectArgs: any[] = [];
    for (const key in object) {
      objectArgs.push(
        reducer.literal(key),
        fromAskScriptAst(object[key], reducer)
      );
    }

    return reducer.object('struct', null, ...objectArgs);
  }

  const { name, props, children = [] } = ast;

  // Rewrite properties
  const newProps: Record<string, any> = {};
  for (const key in props) {
    newProps[key] = fromAskScriptAst(props[key], reducer);
  }

  // Rewrite children
  const newChildren = (children as any[]).map((child) =>
    fromAskScriptAst(child, reducer)
  );

  return reducer.object(name, newProps, ...newChildren);
}
