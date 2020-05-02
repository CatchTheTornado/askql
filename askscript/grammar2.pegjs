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
      var output = ''
      output += '<ask>\n';
      output += this.askBody.print('  ');
      output += '\n';
      output += '</ask>';
      return output;
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

    print(indent) {
      return this.statementList.map(statement => statement.print(indent)).join('\n')
    }
  }

  class Statement {
    constructor(statement) {
      this.statement = statement;
    }

    // returns output string with the first indent
    print(indent) {
      return indent + this.statement.print(indent);
    }
  }

  class VariableDefinition {
    constructor(modifier, identifier, type, value) {
      this.modifier = modifier
      this.identifier = identifier
      this.type = type
      this.value = value
    }

    // returns string without the first indent
    print(indent) {
      var output = ''
      output += `<${this.modifier.print()} name="${this.identifier.print()}" type={${this.type.print()}} value={${this.type.print(indent)}} />`
      return output
    }
  }

  class Value {
    constructor(expression, methodCallAppliedList) {
      
      this.expression = expression
      this.methodCallAppliedList = methodCallAppliedList
      
      console.log('methodCallAppliedList')
      console.log(methodCallAppliedList)

      // If there are methods applied (which are a syntactic sugar for functions), convert them to functions
      if (methodCallAppliedList.length == 0) {
        this.expressionToPrint = expression
      } else {

        // We need to convert here from:
        //     expression:method1(arg1, arg2):method2(arg3, arg4):...:methodn(argn1, argn2)
        // to:
        //     methodn(method(....(method2(method1(expression, arg1, arg2), arg3, arg4), .....),....), argn1, argn2)
        
        for(const methodCall of methodCallAppliedList) {
          console.log('methodCall.callArgList')
          console.log(methodCall.callArgList)
          const callArgListShallowCopy = methodCall.callArgList.slice()
          callArgListShallowCopy.unshift(expression)
          expression = new FunctionCall(methodCall.identifier, callArgListShallowCopy)
        }
        this.expressionToPrint = expression
      }
    }

    // returns string without the first indent
    // 
    print(indent) {
      var output = ''
      switch(typeof this.expressionToPrint) {
        case 'ValueLiteral':
          output += this.expressionToPrint.print()
          break
        default:
          // If the value is complex (identifier or function call), we want to write it in new line with an indent.
          output += '\n' + indent + '  ' + this.expressionToPrint.print(indent + '  ')
      }
      return output
    }
  }

  class FunctionDefinition {
    constructor(functionHeader, statementList) {
      this.functionHeader = functionHeader;
      this.statementList = statementList;
    }

    // returns string without the first indent
    print(indent) {
      var output = '';
      output += this.functionHeader.print(indent);
      for(const statement of this.statementList) {
        output += statement.print(indent + '  ') + '\n'
      }
      output += indent + '</fun>';
      return output;
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

    // returns string without the first indent
    print(indent) {
      var output = '';
      output += '<fun\n'
      output += indent + '  ' + `name="${this.identifier.text}"\n` // Yes, we print function identifier without "<ref name='' ... />"
      output += indent + '  ' + `args="{${this.argumentList.print(indent)}}"\n`
      output += indent + '  ' + `returns="{${this.returnType.print(indent)}}"\n`
      output += indent + '>\n'
      return output
    }
  }

  class Arg {
    constructor(identifier, type) {
      this.identifier = identifier;
      this.type = type;
    }

    print(indent) {
      // We print identifier with "<ref name='' />"
      return `["${this.identifier.text}", ${this.type.print()}]`
    }
  }

  class If {
    constructor(value, statementList) {
      this.value = value
      this.statementList = statementList
    }

    // returns string without the first indent
    print(indent) {
      var output = '';
      output += `<if condition={${this.value.print(indent)}}>\n`
      for(const statement of this.statementList) {
        output += statement.print(indent + '  ') + '\n'
      }
      output += indent + '</if>\n'
      return output
    }
  }

  class While {
    constructor(value, statementList) {
      this.value = value
      this.statementList = statementList
    }

    // returns string without the first indent
    print(indent) {
      var output = '';
      output += '<while condition={}>\n'
      for(const statement of this.statementList) {
        output += statement.print(indent + '  ') + '\n'
      }
      output += indent + '</while>\n'
      return output
    }
  }

  class Return {
    constructor(value) {
      this.value = value
    }

    // returns string without the first indent
    print(indent) {
      var output = '';
      output += `<return value={${this.value.print(indent)}} />\n`
      return output
    }
  }

  class FunctionCall {
    constructor(identifier, callArgList) {
      this.identifier = identifier
      this.callArgList = new CallArgumentList(callArgList)
    }

    // returns string without the first indent
    print(indent) {
      var output = ''
      // Yes, print function name without <ref name='' />
      output += `<call name="${this.identifier.text}" args={${this.callArgList.print(indent)}} />`
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
      // We print identifier with "<ref name='' />"
      return `<${this.identifier.text} />`
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
      return `{"${this.text}"}`
    }
  }

  class Array {
    constructor(valueList) {
      this.valueList = valueList
    }

    print() {
      var output = ''
      output += '['
      output += this.valueList.forEach(value => value.print()).join(',')
      output += ']'
      return output
    }
  }

  class Map {
    constructor(mapEntryList) {
      this.mapEntryList = mapEntryList
    }

    print() {
      var output = ''
      output += '{'
      output += this.mapEntryList.forEach(mapEntry => mapEntry.print()).join(',')
      output += '}'
      return output
    }
  }

  class MapEntry {
    constructor(identifier, value) {
      this.identifier = identifier
      this.value = value
    }

    print() {
      var output = ''
      output += `"${this.identifier}":${this.value.print(indent)}`
      return output
    }
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
      return `<ref name="${this.text}" />`
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
      var output = '';
      output += '[';
      output += this.argList.map(arg => arg.print(indent)).join(',')
      output += ']';
      return output;
    }
  }


  class CallArgumentList {
    constructor(callArgList) {
      this.callArgList = callArgList
    }

    print(indent) {
      var output = '';
      output += '[';
      output += this.callArgList.map(value => value.print(indent)).join(',')
      output += ']';
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
  return new AskHeader(typeof aL === 'undefined' ? [] : aL);
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
      m:modifier ws+ i:identifier t:variableDefinition_type? ws+ '=' ws+ v:value { return new VariableDefinition(m, i, typeof t === 'undefined' ? anyType : t, v)}
variableDefinition_type = ws+ ':' ws+ t:type { return t }

value = 
    e:(
      functionCall
    / identifier
    / valueLiteral)
    mCAs:methodCallApplied* { return new Value(e, mCAs) }


functionDefinition = fH:functionHeader cB:codeBlock functionFooter { return new FunctionDefinition(fH, cB) }

functionHeader = m:modifier ws+ i:identifier tD:functionHeader_typeDecl? ws* '=' ws* '(' aL:argList ')' rTD:functionHeader_returnTypeDecl? ws* '{' ws* nl { return new FunctionHeader(m, i, typeof tD === 'undefined' ? null : tD, aL, typeof rTD === 'undefined' ? anyType : rTD) }
functionHeader_typeDecl = ws* ':' ws* t1:type { return t1 } // this is the optional variable type declaration
functionHeader_returnTypeDecl = ws* ':' ws* t2:type { return t2 } // this is the optional return type declaration

functionFooter = blockFooter

// a block of code 
codeBlock = statementList

argList = 
    a:arg ',' aL:argList { return aL.unshift(a), aL }
  / a:arg { return [a] }

arg = ws* i:identifier ws* ':' ws* t:type ws* { return new Arg(i, t) }

callArgList = v:valueList { console.log('valueList: ' + v); return v }
valueList = 
    v:value ',' vL:valueList { console.log(',v: ' + v.print('')); vL.unshift(v); return vL }
  / v:value { console.log('v: ' + v.print('')); return [v] }

if =        'if' ws* '(' v:value ')' ws* '{' nl+ cB:codeBlock nlws* '}' {       return new If(v, cB) }
while  = 'while' ws* '(' v:value ')' ws* '{' nl+ cB:codeBlock nlws* '}' {       return new While(v, cB) }
return = 
  'return' ws+ v:value {                                                        return new Return(v) }
  / 'return' {                                                                  return new Return(nullValue) }

functionCall = i:identifier ws* '(' cAL:callArgList ')' {                       return new FunctionCall(i, cAL) }
methodCallApplied   = ws* ':' ws* i:identifier ws* cAL:methodCallAppliedArgList?  { console.log('i: ' + i.print() + ', typeof cAL: ' + (typeof cAL)); if (typeof cAL !== 'undefined') console.log('JSON: ' + JSON.stringify(cAL)); return new MethodCallApplied(i, cAL === null ? [] : cAL)}
methodCallAppliedArgList = '(' cAL:callArgList ')' { console.log('cAL: ' + (typeof cAL) + ' : ' + JSON.stringify(cAL) + ' ' + cAL.toString()); return cAL }

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
