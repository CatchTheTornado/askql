// TODO:
// - unions
// - records
// - tuples

{

  // In the following classes arguments to all the constructors have the same name as the class they are type of.
  // If a variable name ends with *List, it means it's a list of elements of type *.
  //
  // Except for one instance (typeNullable argument), all values are non-null.
  class Ask {
    constructor(askHeader, askBody) {
      this.askHeader = askHeader;
      this.askBody = askBody;
    }

    function print() {
      var output = ''
      output += '<ask>\n';
      output += this.askBody.print(2);
      output += '</ask>';
    }
  }

  class AskHeader {
    constructor(argList) {
      this.argList = argList;
    }
  }

  class AskBody {
    constructor(statementList) {
      this.statementList = statementList;
    }
  }

  class Statement {
    constructor(statement) {
      this.statement = statement;
    }
  }

  class VariableDefinition {
    constructor(modifier, identifier, type, value) {
      this.modifier = modifier
      this.identifier = identifier
      this.type = type
      this.value = value
    }
  }

  class Value {
    constructor(expression, methodCallAppliedList) {
      this.expression = expression
      this.methodCallAppliedList = methodCallAppliedList
    }
  }

  class FunctionDefinition {
    constructor(functionHeader, functionBody) {
      this.functionHeader = functionHeader;
      this.functionBody = functionBody;
    }
  }

  class FunctionHeader {
    constructor(modifier, identifier, typeNullable, argumentList, type) {
      this.modifier = modifier
      this.identifier = identifier
      this.typeNullable = typeNullable
      this.argumentList = argumentList
      this.type = type
    }
  }

  class Arg {
    constructor(identifier, type) {
      this.identifier = identifier;
      this.type = type;
    }
  }

  class If {
    constructor(value, callBlock) {
      this.value = value
      this.callBlock = callBlock
    }
  }

  class While {
    constructor(value, callBlock) {
      this.value = value
      this.callBlock = callBlock
    }
  }

  class Return {
    constructor(value) {
      this.value = value
    }
  }

  class FunctionCall {
    constructor(identifier, callArgList) {
      this.identifier = identifier
      this.callArgList = callArgList
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
  }

  class ValueLiteral {
    constructor(value) {
      this.value = value
    }
  }

  class String {
    constructor(text) {
      this.text = text
    }
  }

  class Array {
    constructor(valueList) {
      this.valueList = valueList
    }
  }

  class Map {
    constructor(mapEntryList) {
      this.mapEntryList = mapEntryList
    }
  }

  class MapEntry {
    constructor(identifier, value) {
      this.identifier = identifier
      this.value = value
    }
  }

  class Const {

  }

  class Let {

  }

  class Identifier {
    constructor(text) {
      this.text = text
    }
  }

  class Null {

  }

  class True {

  }

  class False {

  }

  class Int {
    constructor(text) {
      this.text = text
    }
  }

  class Float {
    constructor(text) {
      this.text = text
    }
  }
  
  const nullValue = new Value(new ValueLiteral(new Null()))
  const anyType = new Type(new Identifier('any'))
}

ask = aH:askHeader aB:askBody askFooter {
  return new Ask(aH, aB);
}

askHeader = ws* 'ask' ws* ('(' aL:argList ')')? ws* '{' ws* nl { //TODO: add return type
  return new AskHeader(typeof aL === 'undefined' ? [] : aL);
}

askFooter = blockFooter (ws / nl)* eof

askBody = sL:statementList { return new AskBody(sL) }

statementList = 
    emptyLine* (
      s:statement nl emptyLine* sL:statementList 
      / s:statement
      / ''
    ) emptyLine* { return typeof sL === 'undefined' ? [s] : sL.unshift(s), sl }

// statement is at least one full line
// statement does NOT include the trailing newline
statement = 
    ws* (
      s:functionDefinition
      / s:variableDefinition
      / s:if
      / s:while
      / s:return
      / s:value
    ) ws* { return new Statement(s) }

// variables other than of function type
variableDefinition = 
      m:modifier ws+ i:identifier (ws+ ':' ws+ t:type)? ws+ '=' ws+ v:value { return new VariableDefinition(m, i, typeof t === 'undefined' ? anyType : t, v)}

value = 
      e:(identifier
    / valueLiteral
    / functionCall)
    mCAs:methodCallApplied* { return new Value(e, mCAs) }


functionDefinition = fH:functionHeader cB:codeBlock functionFooter { return new FunctionDefinition(fH, cB) }

functionHeader = m:modifier ws+ i:identifier (ws* ':' ws* t1:type)? ws* '=' ws* '(' aL:argList ')' (ws* ':' ws* t2:type)? ws* '{' ws* nl { return new FunctionHeader(m, i, typeof t1 === 'undefined' ? null : t1, aL, typeof t1 === 'undefined' ? anyType : t2) }
functionFooter = blockFooter

// a block of code 
codeBlock = statementList

argList = a:arg / a:arg ',' aL:argList { return typeof aL === 'undefined' ? [a] : aL.unshift(a), aL }
arg = ws* i:identifier ws* ':' ws* t:type ws* { return new Arg(i, t) }

callArgList = valueList
valueList = v:value / v:value ',' vL:valueList { return typeof vL === 'undefined' ? [v] : vL.unshift(v), vL }

if =        'if' ws* '(' v:value ')' ws* '{' nl+ cB:codeBlock nlws* '}'      { return new If(v, cB) }
while  = 'while' ws* '(' v:value ')' ws* '{' nl+ cB:codeBlock nlws* '}'      { return new While(v, cB) }
return = 'return' (ws* v:value)?                                             { return new Return(typeof v === 'undefined' ? nullValue : v) }
functionCall = i:identifier ws* '(' cAL:callArgList ')'                      { return new FunctionCall(i, cAL) }
methodCallApplied   = ws* ':' ws* i:identifier ws* ('(' cAL:callArgList ')')?  { return new MethodCallApplied(i, typeof cAL === 'undefined' ? [] : cAL)}

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

mapEntryList = mE:mapEntry / mE:mapEntry ',' mEL:mapEntryList { return typeof mEL === 'undefined' ? [mE] : mEL.unshift(mE), mEL }
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
