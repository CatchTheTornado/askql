export interface Reducer<Value> {
  node(name: string, ...children: Value[]): Value;
  id(name: string): Value;
  string(value: string): Value;
}

const regexp = {
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

  function expressionList<U>(
    this: typeof reducers,
    {
      reducer,
      chars: [openChar, closeChar],
    }: { reducer: Reducer<U>; chars: [string, string] }
  ) {
    process(openChar);
    whitespace();

    const values: U[] = [];
    while (index < code.length && !isAt(closeChar)) {
      const value = this.expression(reducer);
      step('list item', value);
      values.push(value);

      whitespace();
      if (!isAt(closeChar)) {
        process(',');
      }
    }

    process(closeChar);
    return values;
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
      throw new Error('Expeciting an identifier');
    }
    return code.slice(start, index);
  }

  const reducers: Record<
    'call' | 'expression' | 'program' | 'string',
    <U>(reducer: Reducer<U>) => U
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
    expression(r) {
      whitespace();
      step('expression');
      if (isAt('"')) {
        return this.string(r);
      }
      return this.call(r);
    },
    string(r) {
      process('"');
      step('string');
      const start = index;
      for (
        index = start;
        index < code.length && !(!isAt('\\', -1) && isAt('"'));
        index += 1
      );
      if (index === code.length) {
        throw new Error('Unlimited string');
      }
      const end = index;
      process('"');
      return r.string(code.slice(start, end));
    },
    call<U>(r: Reducer<U>) {
      whitespace();
      const name = id();
      whitespace();
      if (!isAt('(')) {
        return r.id(name);
      }
      whitespace();
      step('args for', name);
      const args = expressionList.call(this, {
        chars: ['(', ')'],
        reducer: r,
      }) as U[];
      return r.node(name, ...args);
    },
  };

  return reducers.program(reducer);
}
