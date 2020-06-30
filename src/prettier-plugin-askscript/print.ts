import { Doc, doc, FastPath } from 'prettier';
import { AskScriptAst } from '../askscript';
import jsesc from 'jsesc';

// doc.builders API https://github.com/prettier/prettier/blob/master/commands.md
const { concat, hardline, indent, join } = doc.builders;

export function print(
  path: FastPath<AskScriptAst>,
  options: object,
  print: (path: FastPath) => Doc
): Doc {
  const node = path.getValue();

  if (Array.isArray(node)) {
    return concat(['[', join(', ', path.map(print)), ']']);
  }

  if (typeof node === 'string') {
    return concat(["'", jsesc(node), "'"]);
  }

  if (node == null || typeof node !== 'object') {
    // TODO fixme - use custom object printer
    return concat([JSON.stringify(node)]);
  }

  if ('jsxValue' in node) {
    const value = node.jsxValue;
    if (value == null || typeof value !== 'object') {
      return path.call(print, 'jsxValue');
    }
    const contents: Doc[] = [];
    for (const key in value) {
      contents.push(concat([key, ': ', path.call(print, 'jsxValue', key)]));
    }
    return concat(['{', join(', ', contents), '}']);
  }

  const { name, props, children } = node;

  // console.log(JSON.stringify(node, null, 2));

  const indentChildren = (...names: PropertyKey[]): Doc =>
    concat([
      indent(concat([hardline, join(hardline, path.map(print, ...names))])),
      hardline,
    ]);

  switch (name) {
    case 'ask':
    case 'fun': {
      const args =
        'args' in props
          ? join(
              ', ',
              path.map(
                (argPath) => {
                  const [name] = argPath.getValue() as [string, string];
                  return concat([name, ': ', argPath.call(print, 1)]);
                },
                'props',
                'args'
              )
            )
          : '';
      const returns =
        'returns' in props ? path.call(print, 'props', 'returns') : '';
      return concat([
        name,
        args && concat(['(', args, ')']),
        returns && concat([': ', returns]),
        ' {',
        indentChildren('children'),
        '}',
      ]);
    }

    case 'const': {
      if (typeof props.name !== 'string') {
        throw new Error('call:props.name expected string');
      }
      const type = 'type' in props ? path.call(print, 'props', 'type') : '';
      const value = 'value' in props ? path.call(print, 'props', 'value') : '';
      return concat([
        'const',
        ' ',
        props.name,
        type && concat([': ', type]),
        value && concat([' = ', value]),
      ]);
    }

    case 'let': {
      if (typeof props.name !== 'string') {
        throw new Error('call:props.name expected string');
      }
      return concat([
        'let',
        ' ',
        props.name,
        'value' in props
          ? concat([' = ', path.call(print, 'props', 'value')])
          : '',
      ]);
    }

    case 'assign': {
      if (typeof props.name !== 'string') {
        throw new Error('call:props.name expected string');
      }
      return concat([props.name, ' = ', path.call(print, 'props', 'value')]);
    }

    case 'if': {
      return concat([
        'if (',
        path.call(print, 'props', 'condition'),
        ') {',
        indentChildren('children'),
        '}',
        'else' in props
          ? concat(['else {', indentChildren('props', 'else'), '}'])
          : '',
      ]);
    }

    case 'return': {
      return concat(['return ', path.call(print, 'props', 'value')]);
    }

    case 'call': {
      if (typeof props.name !== 'string') {
        throw new Error('call:props.name expected string');
      }
      if (props.isOperator != null && typeof props.isOperator !== 'boolean') {
        throw new Error('call:props.isOperator expected boolean');
      }
      if (props.isOperator) {
        // TODO add spaces around once https://github.com/xFAANG/askql/issues/30 is resolved
        return concat([
          '(',
          join(`${props.name}`, path.map(print, 'props', 'args')),
          ')',
        ]);
      }

      return concat([
        props.name,
        '(',
        join(', ', path.map(print, 'props', 'args')),
        ')',
      ]);
    }

    case 'ref': {
      if (typeof props.name !== 'string') {
        throw new Error('ref:props.name expected string');
      }
      return concat(['get', '(', path.call(print, 'props', 'name'), ')']);
    }

    case 'while': {
      return concat([
        'while (',
        path.call(print, 'props', 'condition'),
        ') {',
        indentChildren('children'),
        '}',
      ]);
    }

    case 'for': {
      return concat([
        'for (',
        path.call(print, 'props', 'initialization'),
        ';',
        path.call(print, 'props', 'condition'),
        ';',
        path.call(print, 'props', 'finalExpression'),
        ') {',
        indentChildren('children'),
        '}',
      ]);
    }

    case 'forOf': {
      return concat([
        'for (',
        path.call(print, 'props', 'key'),
        ' of ',
        path.call(print, 'props', 'of'),
        ') {',
        indentChildren('children'),
        '}',
      ]);
    }

    case 'forIn': {
      return concat([
        'for (',
        path.call(print, 'props', 'key'),
        ' in ',
        path.call(print, 'props', 'in'),
        ') {',
        indentChildren('children'),
        '}',
      ]);
    }

    case 'query': {
      return concat(['query {', indentChildren('children'), '}']);
    }

    case 'node': {
      if (typeof props.name !== 'string') {
        throw new Error('node:props.name expected string');
      }
      return concat([
        props.name,
        ' : ',
        path.call(print, 'props', 'value'),
        children != null ? concat([' {', indentChildren('children'), '}']) : '',
      ]);
    }

    default:
      throw new Error(`Unknown AST name: ${name}`);
  }
}
