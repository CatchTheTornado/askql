// TODO:
// - else
// - array type definition
// - object type definition
//
// - unions
// - records
// - tuples

{

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
        children: this.askBody.print()
      }
      return output;
    }
  }

  class AskHeader {
    constructor(argList) {
      this.argList = argList;
    }

    print() {
      let output = {
        args: this.argList.map(arg => arg.print())
      }
      return output
    }
  }

  class AskBody {
    constructor(statementList) {
      this.statementList = statementList;
    }

    print() {
      return this.statementList.map(statement => statement.print())
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
      this.modifier = modifier
      this.identifier = identifier
      this.type = type
      this.value = value
    }

    print() {
      let output = {
        name: this.modifier.print(),
        props: {
          name: this.identifier.print(),
          type: this.type.print(),
          value: this.value.print()
        }
      }
      return output
    }
  }

  class Value {
    constructor(expression, methodCallAppliedList) {
      
      this.expression = expression
      this.methodCallAppliedList = methodCallAppliedList
      
      // If there are methods applied (which are a syntactic sugar for functions), convert them to functions
      if (methodCallAppliedList.length == 0) {
        this.expressionToPrint = expression
      } else {

        // We need to convert here from:
        //     expression:method1(arg1, arg2):method2(arg3, arg4):...:methodn(argn1, argn2)
        // to:
        //     methodn(method(....(method2(method1(expression, arg1, arg2), arg3, arg4), .....),....), argn1, argn2)
        
        for(const methodCall of methodCallAppliedList) {
          const callArgListShallowCopy = methodCall.callArgList.slice()
          callArgListShallowCopy.unshift(expression)
          expression = new FunctionCall(methodCall.identifier, callArgListShallowCopy)
        }
        this.expressionToPrint = expression
      }
    }

    print() {
      let output = this.expressionToPrint.print()
      return output
    }
  }

  class FunctionDefinition {
    constructor(functionHeader, statementList) {
      this.functionHeader = functionHeader;
      this.statementList = statementList;
    }

    print(indent) {
      let output = this.functionHeader.print()
      output.children = this.statementList.map(statement => statement.print())

      return output
    }
  }

  class FunctionHeader {
    constructor(modifier, identifier, typeNullable, argumentList, returnType) {
      this.modifier = modifier
      this.identifier = identifier
      this.typeNullable = typeNullable
      this.argumentList = new ArgumentList(argumentList)
      this.returnType = returnType
    }

    print(indent) {
      let output = {
        name: 'fun',
        props: {
          name: this.identifier.text,
          args: this.argumentList.print(),
          returns: this.returnType.print()
        }
      }
      return output
    }
  }

  class Arg {
    constructor(identifier, type) {
      this.identifier = identifier;
      this.type = type;
    }

    print(indent) {
      let output = [this.identifier.text, this.type.print()]
      return output
    }
  }

  class If {
    constructor(value, statementList) {
      this.value = value
      this.statementList = statementList
    }

    print(indent) {
      let output = {
        name: 'if',
        props: {
          condition: this.value.print(),
        },
        children: this.statementList.map(statement => statement.print())
      }
      return output
    }
  }

  class While {
    constructor(value, statementList) {
      this.value = value
      this.statementList = statementList
    }

    print(indent) {
      let output = {
        name: 'while',
        props: {
          condition: this.value.print(),
        },
        children: this.statementList.map(statement => statement.print())
      }
      return output
    }
  }

  class Return {
    constructor(value) {
      this.value = value
    }

    print(indent) {
      let output = {
        name: 'return',
        props: {
          value: this.value.print()
        }
      }
      return output
    }
  }

  class FunctionCall {
    constructor(identifier, callArgList) {
      this.identifier = identifier
      this.callArgList = new CallArgumentList(callArgList)
    }

    print(indent) {
      let output = {
        name: 'call',
        props: {
          name: this.identifier.text,
          args: this.callArgList.print()
        }
      }
      return output
    }
  }

  class MethodCallApplied {
    constructor(identifier, callArgList) {
      this.identifier = identifier
      this.callArgList = callArgList
    }
  }

  class Type {
    constructor(identifier) {
      this.identifier = identifier
    }

    print() {
      let output = {
        name: this.identifier.text
      }
      return output
    }
  }

  class ValueLiteral {
    constructor(value) {
      this.value = value
    }

    print() {
      return this.value.print()
    }
  }

  class String {
    constructor(text) {
      this.text = text
    }

    print() {
      // return `{"${this.text}"}`
      return this.text
    }
  }

  class Array {
    constructor(valueList) {
      this.valueList = valueList
    }

    print() {
      let output = this.valueList.map(value => value.print())
      return output
    }
  }

  class Map {
    constructor(mapEntryList) {
      this.mapEntryList = mapEntryList
    }

    print() {
      let output = {}
      this.mapEntryList.forEach(mapEntry => output[mapEntry.identifier.text] = mapEntry.value.print())
      return output
    }
  }

  class MapEntry {
    constructor(identifier, value) {
      this.identifier = identifier
      this.value = value
    }

    // print not needed as Map handles it
  }

  class Const {
    print() {
      return 'const'
    }
  }

  class Let {
    print() {
      return 'let'
    }
  }

  class Identifier {
    constructor(text) {
      this.text = text
    }

    print() {
      let output = {
        name: 'ref',
        props: {
          name: this.text
        }
      }
      return output
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
      this.text = text
    }

    print() {
      return this.text
    }
  }

  class Float {
    constructor(text) {
      this.text = text
    }

    print() {
      return this.text
    }
  }

// ---

  class ArgumentList {
    constructor(argList) {
      this.argList = argList
    }

    print(indent) {
      let output = this.argList.map(arg => arg.print())
      return output;
    }
  }


  class CallArgumentList {
    constructor(callArgList) {
      this.callArgList = callArgList
    }

    print(indent) {
      let output = this.callArgList.map(value => value.print())
      return output;
    }
  }

  const nullValue = new Value(new ValueLiteral(new Null()), [])
  const anyType = new Type(new Identifier('any'))
}

ask = aH:askHeader aB:askBody askFooter {
  return new Ask(aH, aB);
}

askHeader = ws* 'ask' ws* aL:askHeader_argList? ws* '{' ws* nl { //TODO: add return type
  return new AskHeader(aL === null ? [] : aL);
}
askHeader_argList = ('(' aL:argList ')') { return aL }

askFooter = blockFooter (ws / nl)* eof

askBody = sL:statementList { return new AskBody(sL) }

statementList = emptyLine* sL:statementList_NoEmptyLines emptyLine* { return sL }
statementList_NoEmptyLines = 
      s:statement nl emptyLine* sL:statementList { return sL.unshift(s), sL }
    / s:statement { return [s] }
    / '' { return [] }

// statement is at least one full line
// statement does NOT include the trailing newline
statement = ws* s:statement_NoWs ws* { return s }
statement_NoWs = 
    s:(
      functionDefinition
      / variableDefinition
      / if
      / while
      / return
      / value
    ) { return new Statement(s) }

// variables other than of function type
variableDefinition = 
      m:modifier ws+ i:identifier t:variableDefinition_type? ws+ '=' ws+ v:value { return new VariableDefinition(m, i, t === null ? anyType : t, v)}
variableDefinition_type = ws+ ':' ws+ t:type { return t }

value = 
    e:(
      functionCall
    / identifier
    / valueLiteral)
    mCAs:methodCallApplied* { return new Value(e, mCAs) }


functionDefinition = fH:functionHeader cB:codeBlock functionFooter { return new FunctionDefinition(fH, cB) }

functionHeader = m:modifier ws+ i:identifier tD:functionHeader_typeDecl? ws* '=' ws* '(' aL:argList ')' rTD:functionHeader_returnTypeDecl? ws* '{' ws* nl { return new FunctionHeader(m, i, tD, aL, rTD === null ? anyType : rTD) }
functionHeader_typeDecl = ws* ':' ws* t1:type { return t1 } // this is the optional variable type declaration
functionHeader_returnTypeDecl = ws* ':' ws* t2:type { return t2 } // this is the optional return type declaration

functionFooter = blockFooter

// a block of code 
codeBlock = statementList

argList = 
    a:arg ',' aL:argList { return aL.unshift(a), aL }
  / a:arg { return [a] }

arg = ws* i:identifier ws* ':' ws* t:type ws* { return new Arg(i, t) }

callArgList = v:valueList { return v }
valueList = 
    v:value ',' vL:valueList { vL.unshift(v); return vL }
  / v:value { return [v] }

if =        'if' ws* '(' v:value ')' ws* '{' nl+ cB:codeBlock nlws* '}' {       return new If(v, cB) }
while  = 'while' ws* '(' v:value ')' ws* '{' nl+ cB:codeBlock nlws* '}' {       return new While(v, cB) }
return = 
  'return' ws+ v:value {                                                        return new Return(v) }
  / 'return' {                                                                  return new Return(nullValue) }

functionCall = i:identifier ws* '(' cAL:callArgList ')' {                       return new FunctionCall(i, cAL) }
methodCallApplied   = ws* ':' ws* i:identifier ws* cAL:methodCallAppliedArgList?  { return new MethodCallApplied(i, cAL === null ? [] : cAL)}
methodCallAppliedArgList = '(' cAL:callArgList ')' { return cAL }

// === simple elements ===
type = i:identifier { return new Type(i) }

valueLiteral = 
    v:(
      null
      / boolean
      / int
      / float
      / string
      / array
      / map
    ) { return new ValueLiteral(v) }

string = '"' sC:stringContents  '"' { return sC }
stringContents = ch* { return new String(text()) }

array = '[' vL:valueList ']' { return new Array(vL) }
map = '{' mEL:mapEntryList '}' { return new Map(mEL) }

mapEntryList = 
    mE:mapEntry ',' mEL:mapEntryList {  return mEL.unshift(mE), mEL }
  / mE:mapEntry {                       return [mE] }
mapEntry = i:identifier ':' v:value { return new MapEntry(i, v) }


modifier = const / let
const = 'const' { return new Const() }
let = 'let' { return new Let() }

blockFooter = ws* '}'


emptyLine = ws* nl
nlws = nl / ws

// === literals ===
identifier = [_$a-zA-Z][-_$a-zA-Z0-9]* { return new Identifier(text()) } // TODO: add Unicode here
null = 'null' { return new Null() }
boolean = true / false
true = 'true' { return new True() }
false = 'false' { return new False() }
int = [-]?[0-9]+ { return new Int(text()) }               // TODO: yes, multiple leading zeros possible, I might fix one day
float = [-]?[0-9]+ '.' [0-9]+ { return new Float(text()) }  // TODO: yes, multiple leading zeros possible, I might fix one day

// === character classes ===

// character (in string)
ch = 
      [\x20\x21\x23-\x5B\x5D-\xff] // all printable characters except " and \
    / '\\' escape
    
escape =
      '"'
    / '\\'  // this is one backslash
    / 'u' hex hex hex hex

// digits (dec and hex)
hex = [0-9A-Fa-f]

digit = [0-9]
onenine = [1-9]


// whitespace
ws = ' ' / '\t'

// new line
nl = '\n' / '\r' 

// end of file
eof = (!.)?
