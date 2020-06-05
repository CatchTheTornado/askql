import type { AskCodeOrValue } from '../../askcode';
import type { AskScriptAst } from '../../askscript';

type AstReducer = (
  name: string | Function,
  propsOrNull: Record<string, AskCodeOrValue> | null,
  ...children: AskCodeOrValue[]
) => AskCodeOrValue;

export function fromAskScriptAst(
  ast: AskScriptAst,
  reducer: AstReducer
): AskCodeOrValue {
  if (Array.isArray(ast)) {
    return reducer(
      'list',
      null,
      ...ast.map((ast) => fromAskScriptAst(ast, reducer))
    );
  }

  if (ast == null || typeof ast !== 'object') {
    return ast;
  }

  if ('jsxValue' in ast) {
    const value = ast.jsxValue;
    if (value == null || typeof value !== 'object') {
      return value;
    }
    const object = value;
    const objectArgs: any[] = [];
    for (const key in object) {
      objectArgs.push(key, fromAskScriptAst(object[key], reducer));
    }

    return reducer('code', { object: true }, ...objectArgs);
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

  return reducer(name, newProps, ...newChildren);
}
