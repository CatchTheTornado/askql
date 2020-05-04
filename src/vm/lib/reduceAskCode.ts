export interface Reducer<Value> {
  call(fun: Value, ...args: Value[]): Value;
  function(...expressions: string[]): Value;
  number(serialized: string): Value;
  reference(name: string): Value;
  string(serialized: string): Value;
}

export const askCodeReducer: Reducer<string> = {
  call: (fun, ...args) => `${fun}(${args.join(',')})`,
  function: (...expressions) => `{${expressions.join(',')}}`,
  number: (serialized) => `${serialized}`,
  reference: (name) => name,
  string: (serialized) => `"${serialized}"`,
};

const regexp = {
  digit: /[0-9]/,
  idChar: /[_a-zA-Z0-9]/,
};

interface Options {
  logging: boolean;
  stopAfterSteps: number;
}

/**
 *
 * @param reducer
 * @param code
 */
export function reduceAskCode<T = any>(
  reducer: Reducer<T>,
  code: string,
  { logging = false, stopAfterSteps }: Partial<Options> = {}
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

  const reducers: Record<
    'call' | 'expression' | 'function' | 'id' | 'number' | 'program' | 'string',
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
      if (isAtRegExp(regexp.digit)) {
        return this.number(r);
      }
      return this.call(r);
    },
    number(r) {
      step('number');
      const start = index;
      for (
        index = start;
        index < code.length && isAtRegExp(regexp.digit);
        index += 1
      );
      return r.number(code.slice(start, index));
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
      const fun = isAt('{') ? this.function(r) : this.id(r);
      whitespace();
      if (!isAt('(')) {
        return fun;
      }
      whitespace();
      step('args for', fun);
      const args = expressionList.call(this, {
        chars: ['(', ')'],
        reducer: r,
      }) as U[];
      return r.call(fun, ...args);
    },
    function(r) {
      step('function');
      const statements = expressionList.call(this, {
        chars: ['{', '}'],
        reducer: askCodeReducer,
      }) as string[];
      return r.function(...statements);
    },
    id(r) {
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
      return r.reference(code.slice(start, index));
    },
  };

  return reducers.program(reducer);
}
