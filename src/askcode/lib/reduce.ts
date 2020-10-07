export interface Reducer<Value> {
  node(name: string, ...children: Value[]): Value;
  id(name: string): Value;
  value(value: null | string | number | boolean): Value;
}

const regexp = {
  numberChar: /[0-9.-]/,
  idChar: /[_a-zA-Z0-9]/,
};

// AskCode responsible for syntax sugar for REPL - easy structures

interface Options<T> {
  reducer: Reducer<T>;
  logging: boolean;
  stopAfterSteps: number;
}

/**
 *
 * @param reducer
 * @param code
 */
export function reduce<T = any>(
  reducer: Reducer<T>,
  code: string,
  { logging = false, stopAfterSteps }: Partial<Options<T>> = {}
): T {
  if (code === '') {
    throw new Error('Empty program');
  }

  let index = 0;
  let steps = 0;

  function step(message: any, ...rest: any[]) {
    steps += 1;
    if (stopAfterSteps != null && steps > stopAfterSteps) {
      throw new Error('!');
    }
    if (!logging) {
      return;
    }
    console.log(message, ...rest, ' - ', {
      index,
      at: code[index],
    });
  }

  function isAt(char: string | RegExp, delta: number = 0) {
    return (
      index + delta >= 0 &&
      index + delta < code.length &&
      code[index + delta] === char
    );
  }

  function isAtRegExp(regExp: RegExp, delta: number = 0) {
    return (
      index + delta >= 0 &&
      index + delta < code.length &&
      regExp.test(code[index + delta])
    );
  }

  function process(char: string) {
    if (!isAt(char)) {
      throw new Error(`Expecting: "${char}"`);
    }
    step(`process(${char})`);
    index += 1;
  }

  function whitespace() {
    while (isAt(' ') || isAt('\n')) {
      index += 1;
    }
  }

  function id(): string {
    whitespace();
    step('id');
    const start = index;
    for (
      index = start;
      index < code.length && isAtRegExp(regexp.idChar);
      index += 1
    );
    if (index === start) {
      throw new Error('Expecting an identifier');
    }
    return code.slice(start, index);
  }

  const reducers: Record<
    'call' | 'expression' | 'expressionList' | 'number' | 'program' | 'string',
    <U>(reducer: Reducer<U>, ...args: any[]) => U
  > = {
    program(r) {
      const value = this.expression(r);
      whitespace();
      if (index < code.length) {
        throw new Error(
          `Unexpected chars at the end of the program: ${code.slice(index)}`
        );
      }
      return value;
    },
    expressionList<U>(
      r: Reducer<U>,
      {
        name,
        openChar,
        closeChar,
        separator = ',',
        oddSeparator = separator,
      }: {
        name: string;
        openChar: string;
        closeChar: string;
        separator: string;
        oddSeparator: string;
      }
    ) {
      process(openChar);
      whitespace();

      const values: U[] = [];
      const start = index;
      while (index < code.length && !isAt(closeChar)) {
        const value = this.expression(r);
        step('list item', value);
        values.push(value);

        whitespace();
        if (!isAt(closeChar)) {
          process((index - start) % 2 ? oddSeparator : separator);
        }
      }

      process(closeChar);
      return r.node(name, ...values);
    },
    expression(r) {
      whitespace();
      step('expression');
      if (isAt('"') || isAt("'")) {
        return this.string(r);
      }
      if (isAtRegExp(regexp.numberChar)) {
        return this.number(r);
      }
      if (isAt('[')) {
        return this.expressionList(r, {
          name: 'list',
          openChar: '[',
          closeChar: ']',
        });
      }
      if (isAt('{')) {
        return this.expressionList(r, {
          name: 'object',
          openChar: '{',
          closeChar: '}',
          oddSeparator: ':',
        });
      }
      return this.call(r);
    },
    string(r, quote = code[index]) {
      process(quote);
      step('string');
      const start = index;
      for (
        index = start;
        index < code.length && !(!isAt('\\', -1) && isAt(quote));
        index += 1
      );
      if (index === code.length) {
        throw new Error('Unlimited string');
      }
      const end = index;
      process(quote);
      return r.value(code.slice(start, end));
    },
    number(r) {
      step('number');
      const start = index;
      for (
        index = start;
        index < code.length && isAtRegExp(regexp.numberChar);
        index += 1
      );
      const end = index;
      // TODO(mh) throw if multiple dots in the number
      return r.value(Number(code.slice(start, end)));
    },
    call<U>(r: Reducer<U>) {
      whitespace();
      const name = id();
      whitespace();
      if (!isAt('(')) {
        return r.id(name);
      }
      whitespace();
      return this.expressionList(r, { name, openChar: '(', closeChar: ')' });
    },
  };

  return reducers.program(reducer);
}
