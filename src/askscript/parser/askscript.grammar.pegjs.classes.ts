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

  print(): object {
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

  print(): object {
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

  print(): object {
    return this.statementList.map((statement) => statement.print());
  }
}

export class Statement {
  statement:
    | FunctionDefinition
    | VariableDefinition
    | If
    | While
    | Return
    | Value;

  constructor(
    statement:
      | FunctionDefinition
      | VariableDefinition
      | If
      | While
      | Return
      | Value
  ) {
    this.statement = statement;
  }

  print(): object | string | number {
    return this.statement.print();
  }
}

export class VariableDefinition {
  modifier: Const | Let;
  identifier: Identifier;
  type: Type;
  value: Value;

  constructor(
    modifier: Const | Let,
    identifier: Identifier,
    type: Type,
    value: Value
  ) {
    this.modifier = modifier;
    this.identifier = identifier;
    this.type = type;
    this.value = value;
  }

  print(): object {
    let output = {
      name: this.modifier.print(),
      props: {
        name: this.identifier.text,
        type: this.type.print(),
        value: this.value.print(),
      },
    };
    return output;
  }
}

export class Value {
  expression: FunctionCall | Query | ValueLiteral | Identifier | FunctionObject;
  methodCallAppliedList: MethodCallApplied[];

  expressionToPrint:
    | FunctionCall
    | Query
    | ValueLiteral
    | Identifier
    | FunctionObject;

  constructor(
    expression:
      | FunctionCall
      | Query
      | ValueLiteral
      | Identifier
      | FunctionObject,
    methodCallAppliedList: MethodCallApplied[]
  ) {
    this.expression = expression;
    this.methodCallAppliedList = methodCallAppliedList;

    // If there are methods applied (which are a syntactic sugar for functions), convert them to functions
    if (methodCallAppliedList.length == 0) {
      this.expressionToPrint = expression;
    } else {
      // We need to convert here from:
      //     expression:method1(arg1, arg2):method2(arg3, arg4):...:methodn(argn1, argn2)
      // to:
      //     methodn(method(....(method2(method1(expression, arg1, arg2), arg3, arg4), .....),....), argn1, argn2)

      for (const methodCall of methodCallAppliedList) {
        const callArgListShallowCopy = methodCall.callArgList.slice();
        callArgListShallowCopy.unshift(new Value(expression, []));
        expression = new FunctionCall(
          methodCall.identifier,
          callArgListShallowCopy
        );
      }
      this.expressionToPrint = expression;
    }
  }

  print(): object | string | number {
    let output = this.expressionToPrint.print();
    return output;
  }
}

export class FunctionDefinition {
  functionSignature: FunctionSignature;
  functionObject: FunctionObject;

  constructor(
    functionSignature: FunctionSignature,
    functionObject: FunctionObject
  ) {
    this.functionSignature = functionSignature;
    this.functionObject = functionObject;
  }

  print(): object {
    let output = {
      name: 'fun',
      props: {
        name: this.functionSignature.identifier.text,
        args: this.functionObject.functionHeader.argumentList.print(),
        returns: this.functionObject.functionHeader.returnType.print(),
      },
      children: this.functionObject.statementList.map((statement) =>
        statement.print()
      ),
    };

    return output;
  }
}

export class FunctionSignature {
  modifier: Const | Let;
  identifier: Identifier;
  typeNullable: Type;

  constructor(
    modifier: Const | Let,
    identifier: Identifier,
    typeNullable: Type
  ) {
    this.modifier = modifier;
    this.identifier = identifier;
    this.typeNullable = typeNullable;
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
  print(): object {
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
  returnType: Return;

  constructor(argumentList: Arg[], returnType: Return) {
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

  print(): object {
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

  print(): object {
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

  print(): object {
    let output = {
      name: 'else',
      children: this.statementList.map((statement) => statement.print()),
    };
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

  print(): object {
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

export class Return {
  value: Value;

  constructor(value: Value) {
    this.value = value;
  }

  print(): object {
    let output = {
      name: 'return',
      props: {
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

  print(): object {
    let output = {
      name: 'call',
      props: {
        name: this.identifier.text,
        args: this.callArgList.map((value) => value.print()),
      },
    };
    return output;
  }
}

export class MethodCallApplied {
  identifier: Identifier;
  callArgList: Value[];

  constructor(identifier: Identifier, callArgList: Value[]) {
    this.identifier = identifier;
    this.callArgList = callArgList;
  }
}

export class Type {
  identifier: Identifier;

  constructor(identifier: Identifier) {
    this.identifier = identifier;
  }

  print(): string {
    let output = this.identifier.text;
    return output;
  }
}

export class ArrayType {
  type: Type;

  constructor(type: Type) {
    this.type = type;
  }

  print(): string {
    let output = 'array(' + this.type.print() + ')';
    return output;
  }
}

export class ValueLiteral {
  value: Null | True | False | Float | Int | String | Array | Map;

  constructor(value: Null | True | False | Float | Int | String | Array | Map) {
    this.value = value;
  }

  print(): object | string | number {
    return this.value.print();
  }
}

export class String {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  print(): string {
    let output = this.text;
    return output;
  }
}

export class Array {
  valueList: Value[];

  constructor(valueList: Value[]) {
    this.valueList = valueList;
  }

  print(): object {
    let output = this.valueList.map((value) => value.print());
    return output;
  }
}

export class Map {
  mapEntryList: MapEntry[];

  constructor(mapEntryList: MapEntry[]) {
    this.mapEntryList = mapEntryList;
  }

  print(): object {
    let output: LooseObject = {};
    this.mapEntryList.forEach(
      (mapEntry) => (output[mapEntry.identifier.text] = mapEntry.value.print())
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
    return 'set';
  }
}

export class Identifier {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  print(): object {
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
  print(): object {
    let output = {
      name: 'value',
      props: {
        type: 'empty',
        value: 'null',
      },
    };
    return output;
  }
}

export class True {
  print(): object {
    let output = {
      name: 'value',
      props: {
        type: 'boolean',
        value: 'true',
      },
    };
    return output;
  }
}

export class False {
  print(): object {
    let output = {
      name: 'value',
      props: {
        type: 'boolean',
        value: 'false',
      },
    };
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

  print(): object {
    let output = this.argList.map((arg) => arg.print());
    return output;
  }
}

export class Query {
  queryFieldList: (QueryFieldLeaf | QueryFieldNode)[];

  constructor(queryFieldList: (QueryFieldLeaf | QueryFieldNode)[]) {
    this.queryFieldList = queryFieldList;
  }

  print(): object {
    let output = {
      name: 'query',
      children: this.queryFieldList.map((queryField) => queryField.print()),
    };
    return output;
  }
}

export class QueryFieldLeaf {
  identifier: Identifier;
  value: Value;

  constructor(identifier: Identifier, value: Value) {
    this.identifier = identifier;
    this.value = value;
  }

  print(): object {
    let output = {
      name: 'leaf',
      props: {
        name: this.identifier.text,
        value: this.value.print(),
      },
    };
    return output;
  }
}

export class QueryFieldNode {
  identifier: Identifier;
  queryFieldList: (QueryFieldNode | QueryFieldNode)[];

  constructor(
    identifier: Identifier,
    queryFieldList: (QueryFieldNode | QueryFieldNode)[]
  ) {
    this.identifier = identifier;
    this.queryFieldList = queryFieldList;
  }

  print(): object {
    let output = {
      name: 'node',
      props: {
        name: this.identifier.text,
      },
      children: this.queryFieldList.map((queryField) => queryField.print()),
    };
    return output;
  }
}

export const nullValue = new Value(new ValueLiteral(new Null()), []);
export const anyType = new Type(new Identifier('any'));

interface LooseObject {
  [key: string]: any;
}
