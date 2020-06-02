import { Doc, doc, FastPath } from 'prettier';
import { AskScriptAst } from '../askscript';

// doc.builders API https://github.com/prettier/prettier/blob/master/commands.md
const { concat, dedent, hardline, indent, join } = doc.builders;

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
    return concat(["'", node, "'"]);
  }

  if (node == null || typeof node !== 'object') {
    // TODO fixme - use custom object printer
    return concat([JSON.stringify(node)]);
  }

  if ('jsxValue' in node) {
    const object = node.jsxValue;
    const contents: Doc[] = [];
    for (const key in object) {
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
      const args = (props.args as [string, string][])
        .map(([name, type]) => `${name}: ${type}`)
        .join(', ');
      if (props.returns != null && typeof props.returns !== 'string') {
        throw new Error('fun:props.returns expected string');
      }
      const { returns } = props;
      return concat([
        name,
        args ? `(${args})` : '',
        returns ? `: ${returns}` : '',
        ' {',
        indentChildren('children'),
        '}',
      ]);
    }

    case 'const': {
      if (typeof props.name !== 'string') {
        throw new Error('call:props.name expected string');
      }
      return concat([
        'const',
        ' ',
        props.name,
        'value' in props
          ? concat([' = ', path.call(print, 'props', 'value')])
          : '',
      ]);
    }

    case 'set': {
      // FIXME rename to let for consistency
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
