// In the following classes arguments to all the constructors have the same name as the class they are type of.
// If an argument ends with *List, it means it's a list of elements of type *. In some cases it's converted to an object of a class *List in the constructor to make printing AskJSX easier.
//
// Except for one instance (typeNullable argument), all values are non-null.

export class Ask {
  askHeader: AskHeader;
  askBody: AskBody;

  constructor(askHeader: AskHeader, askBody: AskBody) {
    this.askHeader = askHeader;
    this.askBody = askBody;
  }

  print(): LooseObject {
    let output = {
      name: 'ask',
      props: this.askHeader.print(),
      children: this.askBody.print(),
    };
    return output;
  }
}

export class AskHeader {
  argList: Arg[];
  returnTypeOrNull: Type; // TODO: this should cause compile error
  constructor(argList: Arg[], returnTypeOrNull: Type) {
    this.argList = argList;
    this.returnTypeOrNull = returnTypeOrNull;
  }

  print(): LooseObject {
    let output: LooseObject = {
      args: this.argList.map((arg) => arg.print()),
    };
    if (this.returnTypeOrNull !== null)
      output.returns = this.returnTypeOrNull.print();
    return output;
  }
}

export class AskBody {
  statementList: Statement[];

  constructor(statementList: Statement[]) {
    this.statementList = statementList;
  }

  print(): LooseObject {
    return this.statementList.map((statement) => statement.print());
  }
}

export class Statement {
  statement:
    | VariableDefinition
    | If
    | While
    | ForOf
    | ForIn
    | For3
    | Return
    | Assignment
    | Value;

  constructor(
    statement:
      | VariableDefinition
      | If
      | While
      | ForOf
      | ForIn
      | For3
      | Return
      | Assignment
      | Value
  ) {
    this.statement = statement;
  }

  print(): LooseObject | string | number | boolean | null {
    return this.statement.print();
  }
}

export class VariableDefinition {
  valueOrUndef: Value;
  variableDeclaration: VariableDeclaration;

  constructor(variableDeclaration: VariableDeclaration, valueOrUndef: Value) {
    this.valueOrUndef = valueOrUndef;
    this.variableDeclaration = variableDeclaration;
  }

  print(): LooseObject {
    let output = this.variableDeclaration.print();
    if (!('props' in output)) {
      output.props = {};
    }
    if (typeof this.valueOrUndef !== 'undefined') {
      output.props.value = this.valueOrUndef.print();
    }
    return output;
  }
}

export class VariableDeclaration {
  modifier: Const | Let;
  identifier: Identifier;
  type: Type;

  constructor(modifier: Const | Let, identifier: Identifier, type: Type) {
    this.modifier = modifier;
    this.identifier = identifier;
    this.type = type;
  }

  print(): LooseObject {
    let output = {
      name: this.modifier.print(),
      props: {
        name: this.identifier.text,
        type: this.type.print(),
      },
    };
    return output;
  }
}

export class Value {
  nAV: NonArithmValue;
  operValues: OperNAValue[];

  constructor(nAV: NonArithmValue, operValues: OperNAValue[] = []) {
    this.nAV = nAV;
    this.operValues = operValues;
  }

  print(): LooseObject | string | number | boolean | null {
    const nonArithmValue = this.nAV.getShallowCopy();

    this.operValues.forEach((operValue) => {
      nonArithmValue.methodCallAppliedList.push(
        new MethodCallApplied(operValue.operator, [new Value(operValue.nAV)])
      );
    });

    const output = nonArithmValue.print();
    return output;
  }
}

export class OperNAValue {
  operator: Identifier;
  nAV: NonArithmValue;

  constructor(operator: Identifier, nAV: NonArithmValue) {
    this.operator = operator;
    this.nAV = nAV;
  }
}

export class NonArithmValue {
  expression:
    | Value
    | FunctionCall
    | Query
    | ValueLiteral
    | Identifier
    | FunctionObject;
  methodCallAppliedList: (MethodCallApplied | KeyAccessApplied)[];

  constructor(
    expression:
      | Value
      | FunctionCall
      | Query
      | ValueLiteral
      | Identifier
      | FunctionObject,
    methodCallAppliedList: (MethodCallApplied | KeyAccessApplied)[] = []
  ) {
    this.expression = expression;
    this.methodCallAppliedList = methodCallAppliedList;
  }

  print(): LooseObject | string | number | boolean | null {
    let expressionToPrint;

    // If there are methods applied (which are a syntactic sugar for functions), convert them to functions
    if (this.methodCallAppliedList.length == 0) {
      expressionToPrint = this.expression;
    } else {
      // We need to convert here from:
      //     expression:method1(arg1, arg2):method2(arg3, arg4):...:methodn(argn1, argn2)
      // to:
      //     methodn(method(....(method2(method1(expression, arg1, arg2), arg3, arg4), .....),....), argn1, argn2)

      let expression = this.expression;

      for (let methodCall of this.methodCallAppliedList) {
        // Key access is a syntactic sugar for :at() method, e.g.:
        // obj.key equals to:
        // obj:at('key')
        if (methodCall instanceof KeyAccessApplied) {
          methodCall = new MethodCallApplied(new Identifier('at'), [
            new Value(
              new NonArithmValue(
                new ValueLiteral(new StringLiteral(methodCall.identifier.text))
              )
            ),
          ]);
        }

        const callArgListShallowCopy = methodCall.callArgList.slice();
        callArgListShallowCopy.unshift(
          new Value(new NonArithmValue(expression))
        );
        expression = new FunctionCall(
          methodCall.identOrOper,
          callArgListShallowCopy
        );
      }
      expressionToPrint = expression;
    }

    let output = expressionToPrint.print();
    return output;
  }

  getShallowCopy() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

export class FunctionObject {
  functionHeader: FunctionHeader;
  statementList: Statement[];

  constructor(functionHeader: FunctionHeader, statementList: Statement[]) {
    this.functionHeader = functionHeader;
    this.statementList = statementList;
  }

  // This print() is used only in lambda functions
  print(): LooseObject {
    let output = {
      name: 'fun',
      props: {
        args: this.functionHeader.argumentList.print(),
        returns: this.functionHeader.returnType.print(),
      },
      children: this.statementList.map((statement) => statement.print()),
    };

    return output;
  }
}

export class FunctionHeader {
  argumentList: ArgumentList;
  returnType: Type;

  constructor(argumentList: Arg[], returnType: Type) {
    this.argumentList = new ArgumentList(argumentList);
    this.returnType = returnType;
  }
}

export class Arg {
  identifier: Identifier;
  type: Type;

  constructor(identifier: Identifier, type: Type) {
    this.identifier = identifier;
    this.type = type;
  }

  print(): LooseObject {
    let output = [this.identifier.text, this.type.print()];
    return output;
  }
}

export class If {
  value: Value;
  statementList: Statement[];
  elseBlockOrNull: Else;

  constructor(value: Value, statementList: Statement[], elseBlockOrNull: Else) {
    this.value = value;
    this.statementList = statementList;
    this.elseBlockOrNull = elseBlockOrNull;
  }

  print(): LooseObject {
    let output: LooseObject = {
      name: 'if',
      props: {
        condition: this.value.print(),
      },
      children: this.statementList.map((statement) => statement.print()),
    };

    if (this.elseBlockOrNull !== null)
      output.props.else = this.elseBlockOrNull.print();

    return output;
  }
}

export class Else {
  statementList: Statement[];

  constructor(statementList: Statement[]) {
    this.statementList = statementList;
  }

  print(): LooseObject {
    let output = this.statementList.map((statement) => statement.print());
    return output;
  }
}

export class While {
  value: Value;
  statementList: Statement[];

  constructor(value: Value, statementList: Statement[]) {
    this.value = value;
    this.statementList = statementList;
  }

  print(): LooseObject {
    let output = {
      name: 'while',
      props: {
        condition: this.value.print(),
      },
      children: this.statementList.map((statement) => statement.print()),
    };
    return output;
  }
}

export class ForOf {
  variableDeclaration: VariableDeclaration;
  value: Value;
  statementList: Statement[];

  constructor(
    variableDeclaration: VariableDeclaration,
    value: Value,
    statementList: Statement[]
  ) {
    this.variableDeclaration = variableDeclaration;
    this.value = value;
    this.statementList = statementList;
  }

  print(): LooseObject {
    let output = {
      name: 'forOf',
      props: {
        key: this.variableDeclaration.print(),
        of: this.value.print(),
      },
      children: this.statementList.map((statement) => statement.print()),
    };
    return output;
  }
}

export class ForIn {
  variableDeclaration: VariableDeclaration;
  value: Value;
  statementList: Statement[];

  constructor(
    variableDeclaration: VariableDeclaration,
    value: Value,
    statementList: Statement[]
  ) {
    this.variableDeclaration = variableDeclaration;
    this.value = value;
    this.statementList = statementList;
  }

  print(): LooseObject {
    let output = {
      name: 'forIn',
      props: {
        key: this.variableDeclaration.print(),
        in: this.value.print(),
      },
      children: this.statementList.map((statement) => statement.print()),
    };
    return output;
  }
}

export class For3 {
  constructor(
    private s1: Statement | null,
    private s2: Statement | null,
    private s3: Statement | null,
    private body: Statement[]
  ) {}

  print(): LooseObject {
    let output = {
      name: 'for',
      props: {
        initialization: this.s1?.print(),
        condition: this.s2?.print(),
        finalExpression: this.s3?.print(),
      },
      children: this.body.map((stmt) => stmt.print()),
    };
    return output;
  }
}

export class Return {
  value: Value;

  constructor(value: Value) {
    this.value = value;
  }

  print(): LooseObject {
    let output = {
      name: 'return',
      props: {
        value: this.value.print(),
      },
    };
    return output;
  }
}

export class Assignment {
  identifier: Identifier;
  value: Value;

  constructor(identifier: Identifier, value: Value) {
    this.identifier = identifier;
    this.value = value;
  }

  print(): LooseObject {
    let output = {
      name: 'assign',
      props: {
        name: this.identifier.text,
        value: this.value.print(),
      },
    };
    return output;
  }
}

export class FunctionCall {
  identifier: Identifier;
  callArgList: Value[];

  constructor(identifier: Identifier, callArgList: Value[]) {
    this.identifier = identifier;
    this.callArgList = callArgList;
  }

  print(): LooseObject {
    let output = {
      name: 'call',
      props: {
        name: this.identifier.text,
        args: this.callArgList.map((value) => value.print()),
      },
    };

    if (this.identifier.isOperator) {
      (output.props as any).isOperator = true;
    }

    return output;
  }
}

export class MethodCallApplied {
  identOrOper: Identifier;
  callArgList: Value[];

  constructor(identifier: Identifier, callArgList: Value[]) {
    this.identOrOper = identifier;
    this.callArgList = callArgList;
  }

  // no print(), because method calls are rewritten to function calls
}

export class KeyAccessApplied {
  identifier: Identifier;

  constructor(identifier: Identifier) {
    this.identifier = identifier;
  }
}

export type Type = FunctionCall | Identifier;

export class ValueLiteral {
  value: Null | True | False | Float | Int | StringLiteral | Array | Map;

  constructor(
    value: Null | True | False | Float | Int | StringLiteral | Array | Map
  ) {
    this.value = value;
  }

  print(): LooseObject | string | number | boolean | null {
    return this.value.print();
  }
}

export class StringLiteral {
  escapedText: string;

  constructor(escapedText: string) {
    this.escapedText = escapedText;
  }

  print(): string {
    let output = StringLiteral.unescape(this.escapedText);
    return output;
  }

  // remove \ from \\ and \'
  static unescape(escapedText: string): string {
    let unescapedText = '';
    const REGULAR_TEXT = 0;
    const ESCAPE_CHARACTER = 1;
    const ESCAPE_UNICODE = 2;
    const ESCAPE_HEXADECIMAL = 3;

    let state = REGULAR_TEXT;
    let stateUnicodeSequence = '';
    for (const c of escapedText) {
      switch (state) {
        case REGULAR_TEXT:
          if (c == '\\') {
            state = ESCAPE_CHARACTER;
          } else {
            unescapedText += c;
          }
          break;

        case ESCAPE_CHARACTER:
          if (c == "'" || c == '\\') {
            //unescape -> just output c here
            unescapedText += c;
            state = REGULAR_TEXT;
          } else if (c == 'u') {
            state = ESCAPE_UNICODE;
            stateUnicodeSequence = ''; // we empty the container for our Unicode sequence
          } else if (c == 'x') {
            state = ESCAPE_HEXADECIMAL;
            stateUnicodeSequence = ''; // we empty the container for our Unicode sequence
          } else {
            //This shouldn't happen unless someone used escaping for the wrong character.
            //Maybe we should issue a warning.
            unescapedText += c;
            console.warn('Wrong escape sequence: \\' + c);
            state = REGULAR_TEXT;
          }
          break;

        case ESCAPE_UNICODE:
          stateUnicodeSequence += c;
          if (stateUnicodeSequence.length == 4) {
            let c2 = String.fromCodePoint(parseInt(stateUnicodeSequence, 16));
            unescapedText += c2;
            stateUnicodeSequence = '';
            state = REGULAR_TEXT;
          }
          break;

        case ESCAPE_HEXADECIMAL:
          stateUnicodeSequence += c;
          if (stateUnicodeSequence.length == 2) {
            let c2 = String.fromCharCode(parseInt(stateUnicodeSequence, 16));
            unescapedText += c2;
            stateUnicodeSequence = '';
            state = REGULAR_TEXT;
          }
      }
    }
    return unescapedText;
  }
}

export class Array {
  valueList: Value[];

  constructor(valueList: Value[]) {
    this.valueList = valueList;
  }

  print(): LooseObject {
    let output = this.valueList.map((value) => value.print());
    return output;
  }
}

export class Map {
  mapEntryList: MapEntry[];

  constructor(mapEntryList: MapEntry[]) {
    this.mapEntryList = mapEntryList;
  }

  print(): LooseObject {
    let output: LooseObject = {
      jsxValue: {},
    };
    this.mapEntryList.forEach(
      (mapEntry) =>
        (output.jsxValue[mapEntry.identifier.text] = mapEntry.value.print())
    );
    return output;
  }
}

export class MapEntry {
  identifier: Identifier;
  value: Value;

  constructor(identifier: Identifier, value: Value) {
    this.identifier = identifier;
    this.value = value;
  }

  // print not needed as Map handles it
}

export class Const {
  print(): string {
    return 'const';
  }
}

export class Let {
  print(): string {
    return 'let';
  }
}

/**
 * Please note this is a variable/function identifier OR an operator
 * (which should be treated in JSX exactly like an identifier).
 */
export class Identifier {
  constructor(public text: string, public isOperator: boolean = false) {
    this.text = text;
  }

  print(): LooseObject {
    let output = {
      name: 'ref',
      props: {
        name: this.text,
      },
    };
    return output;
  }
}

export class Null {
  print(): LooseObject {
    let output = new FunctionCall(new Identifier('null'), []).print();
    return output;
  }
}

export class True {
  print(): LooseObject {
    let output = new FunctionCall(new Identifier('true'), []).print();
    return output;
  }
}

export class False {
  print(): LooseObject {
    let output = new FunctionCall(new Identifier('false'), []).print();
    return output;
  }
}

export class Int {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  print(): number {
    let output = parseInt(this.text);
    return output;
  }
}

export class Float {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  print(): number {
    let output = parseFloat(this.text);
    return output;
  }
}

// ---

export class ArgumentList {
  argList: Arg[];

  constructor(argList: Arg[]) {
    this.argList = argList;
  }

  print(): LooseObject {
    let output = this.argList.map((arg) => arg.print());
    return output;
  }
}

export class Query {
  queryFieldList: QueryField[];

  constructor(queryFieldList: QueryField[]) {
    this.queryFieldList = queryFieldList;
  }

  print(): LooseObject {
    let output = {
      name: 'query',
      children: this.queryFieldList.map((queryField) => queryField.print()),
    };
    return output;
  }
}

export class QueryField {
  identifier: Identifier;
  value: Value;
  queryFieldList: QueryField[] | null;

  constructor(
    identifier: Identifier,
    value: Value,
    queryFieldList: QueryField[] | null
  ) {
    this.identifier = identifier;
    this.value = value;
    this.queryFieldList = queryFieldList;
  }

  print(): LooseObject {
    let output: LooseObject = {
      name: 'node',
      props: {
        name: this.identifier.text,
        value: this.value.print(),
      },
    };

    if (this.queryFieldList !== null) {
      output.children = this.queryFieldList.map((queryField) =>
        queryField.print()
      );
    }

    return output;
  }
}

export class Remote {
  header: RemoteHeader;
  statementList: Statement[];

  constructor(header: RemoteHeader, statementList: Statement[]) {
    this.header = header;
    this.statementList = statementList;
  }

  print(): LooseObject {
    let output = {
      name: 'remote',
      props: {
        url: this.header.url.print(),
        values: this.header.args.print(),
      },
      children: this.statementList.map((statement) => statement.print()),
    };
    return output;
  }
}

export class RemoteHeader {
  url: Value;
  args: Map;

  constructor(url: Value, args: Map) {
    this.url = url;
    this.args = args;
  }

  // no print() needed, Remote handles it
}

export const nullValue = new NonArithmValue(new ValueLiteral(new Null()), []);
export const anyType = new Identifier('any');

interface LooseObject {
  [key: string]: any;
}
