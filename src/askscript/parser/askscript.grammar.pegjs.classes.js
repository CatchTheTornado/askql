// In the following classes arguments to all the constructors have the same name as the class they are type of.
// If an argument ends with *List, it means it's a list of elements of type *. In some cases it's converted to an object of a class *List in the constructor to make printing AskJSX easier.
//
// Except for one instance (typeNullable argument), all values are non-null.
class Ask {
  constructor(askHeader, askBody) {
    this.askHeader = askHeader;
    this.askBody = askBody;
  }

  print() {
    let output = {
      name: 'ask',
      props: this.askHeader.print(),
      children: this.askBody.print(),
    };
    return output;
  }
}

class AskHeader {
  constructor(argList, returnTypeOrNull) {
    this.argList = argList;
    this.returnTypeOrNull = returnTypeOrNull;
  }

  print() {
    let output = {
      args: this.argList.map((arg) => arg.print()),
    };
    if (this.returnTypeOrNull !== null)
      output.returns = this.returnTypeOrNull.print();
    return output;
  }
}

class AskBody {
  constructor(statementList) {
    this.statementList = statementList;
  }

  print() {
    return this.statementList.map((statement) => statement.print());
  }
}

class Statement {
  constructor(statement) {
    this.statement = statement;
  }

  print() {
    return this.statement.print();
  }
}

class VariableDefinition {
  constructor(modifier, identifier, type, value) {
    this.modifier = modifier;
    this.identifier = identifier;
    this.type = type;
    this.value = value;
  }

  print() {
    let output = {
      name: this.modifier.print(),
      props: {
        name: this.identifier.print(),
        type: this.type.print(),
        value: this.value.print(),
      },
    };
    return output;
  }
}

class Value {
  constructor(expression, methodCallAppliedList) {
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
        callArgListShallowCopy.unshift(expression);
        expression = new FunctionCall(
          methodCall.identifier,
          callArgListShallowCopy
        );
      }
      this.expressionToPrint = expression;
    }
  }

  print() {
    let output = this.expressionToPrint.print();
    return output;
  }
}

class FunctionDefinition {
  constructor(functionHeader, statementList) {
    this.functionHeader = functionHeader;
    this.statementList = statementList;
  }

  print() {
    let output = this.functionHeader.print();
    output.children = this.statementList.map((statement) => statement.print());

    return output;
  }
}

class FunctionHeader {
  constructor(modifier, identifier, typeNullable, argumentList, returnType) {
    this.modifier = modifier;
    this.identifier = identifier;
    this.typeNullable = typeNullable;
    this.argumentList = new ArgumentList(argumentList);
    this.returnType = returnType;
  }

  print() {
    let output = {
      name: 'fun',
      props: {
        name: this.identifier.text,
        args: this.argumentList.print(),
        returns: this.returnType.print(),
      },
    };
    return output;
  }
}

class Arg {
  constructor(identifier, type) {
    this.identifier = identifier;
    this.type = type;
  }

  print() {
    let output = [this.identifier.text, this.type.print()];
    return output;
  }
}

class If {
  constructor(value, statementList, elseBlockOrNull) {
    this.value = value;
    this.statementList = statementList;
    this.elseBlockOrNull = elseBlockOrNull;
  }

  print() {
    let output = {
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

class Else {
  constructor(statementList) {
    this.statementList = statementList;
  }

  print() {
    let output = {
      name: 'else',
      children: this.statementList.map((statement) => statement.print()),
    };
    return output;
  }
}

class While {
  constructor(value, statementList) {
    this.value = value;
    this.statementList = statementList;
  }

  print() {
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

class Return {
  constructor(value) {
    this.value = value;
  }

  print() {
    let output = {
      name: 'return',
      props: {
        value: this.value.print(),
      },
    };
    return output;
  }
}

class FunctionCall {
  constructor(identifier, callArgList) {
    this.identifier = identifier;
    this.callArgList = new CallArgumentList(callArgList);
  }

  print() {
    let output = {
      name: 'call',
      props: {
        name: this.identifier.text,
        args: this.callArgList.print(),
      },
    };
    return output;
  }
}

class MethodCallApplied {
  constructor(identifier, callArgList) {
    this.identifier = identifier;
    this.callArgList = callArgList;
  }
}

class Type {
  constructor(identifier) {
    this.identifier = identifier;
  }

  print() {
    let output = this.identifier.text;
    return output;
  }
}

class ArrayType {
  constructor(type) {
    this.type = type;
  }

  print() {
    let output = 'array(' + this.type.print() + ')';
    return output;
  }
}

class ValueLiteral {
  constructor(value) {
    this.value = value;
  }

  print() {
    return this.value.print();
  }
}

class String {
  constructor(text) {
    this.text = text;
  }

  print() {
    // return `{"${this.text}"}`
    return this.text;
  }
}

class Array {
  constructor(valueList) {
    this.valueList = valueList;
  }

  print() {
    let output = this.valueList.map((value) => value.print());
    return output;
  }
}

class Map {
  constructor(mapEntryList) {
    this.mapEntryList = mapEntryList;
  }

  print() {
    let output = {};
    this.mapEntryList.forEach(
      (mapEntry) => (output[mapEntry.identifier.text] = mapEntry.value.print())
    );
    return output;
  }
}

class MapEntry {
  constructor(identifier, value) {
    this.identifier = identifier;
    this.value = value;
  }

  // print not needed as Map handles it
}

class Const {
  print() {
    return 'const';
  }
}

class Let {
  print() {
    return 'let';
  }
}

class Identifier {
  constructor(text) {
    this.text = text;
  }

  print() {
    let output = {
      name: 'ref',
      props: {
        name: this.text,
      },
    };
    return output;
  }
}

class Null {
  print() {
    return 'null';
  }
}

class True {
  print() {
    return 'true';
  }
}

class False {
  print() {
    return 'false';
  }
}

class Int {
  constructor(text) {
    this.text = text;
  }

  print() {
    return this.text;
  }
}

class Float {
  constructor(text) {
    this.text = text;
  }

  print() {
    return this.text;
  }
}

// ---

class ArgumentList {
  constructor(argList) {
    this.argList = argList;
  }

  print() {
    let output = this.argList.map((arg) => arg.print());
    return output;
  }
}

class CallArgumentList {
  constructor(callArgList) {
    this.callArgList = callArgList;
  }

  print() {
    let output = this.callArgList.map((value) => value.print());
    return output;
  }
}

class Query {
  constructor(queryFieldList) {
    this.queryFieldList = queryFieldList;
  }

  print() {
    let output = {
      name: 'query',
      children: this.queryFieldList.map((queryField) => queryField.print()),
    };
    return output;
  }
}

class QueryFieldLeaf {
  constructor(identifier, value) {
    this.identifier = identifier;
    this.value = value;
  }

  print() {
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

class QueryFieldNode {
  constructor(identifier, queryFieldList) {
    this.identifier = identifier;
    this.queryFieldList = queryFieldList;
  }

  print() {
    let output = {
      name: 'node',
      children: this.queryFieldList.map((queryField) => queryField.print()),
    };
    return output;
  }
}

const nullValue = new Value(new ValueLiteral(new Null()), []);
const anyType = new Type(new Identifier('any'));

module.exports = {
  Ask: Ask,
  AskHeader: AskHeader,
  AskBody: AskBody,
  Statement: Statement,
  VariableDefinition: VariableDefinition,
  Value: Value,
  FunctionDefinition: FunctionDefinition,
  FunctionHeader: FunctionHeader,
  Arg: Arg,
  If: If,
  Else: Else,
  While: While,
  Return: Return,
  FunctionCall: FunctionCall,
  MethodCallApplied: MethodCallApplied,
  Type: Type,
  ArrayType: ArrayType,
  ValueLiteral: ValueLiteral,
  String: String,
  Array: Array,
  Map: Map,
  MapEntry: MapEntry,
  Const: Const,
  Let: Let,
  Identifier: Identifier,
  Null: Null,
  True: True,
  False: False,
  Int: Int,
  Float: Float,
  ArgumentList: ArgumentList,
  CallArgumentList: CallArgumentList,
  Query: Query,
  QueryFieldLeaf: QueryFieldLeaf,
  QueryFieldNode: QueryFieldNode,

  nullValue: nullValue,
  anyType: anyType,
};
