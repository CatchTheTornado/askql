// TODO:
// - else
// - array type definition
// - object type definition
//
// - unions
// - records
// - tuples
// - call() with a lambda function

{
  const ask = require('./askscript.grammar.pegjs.classes')
}


ask = aH:askHeader aB:askBody askFooter {
  return new ask.Ask(aH, aB);
}

askHeader = ws* 'ask' aL:askHeader_argList? aRT:askHeader_retType? ws* '{' ws* nl { //TODO: add return type
  return new ask.AskHeader(aL === null ? [] : aL, aRT);
}
askHeader_argList = ws* '(' aL:argList ')' { return aL }
askHeader_retType = ws* ':' ws* t:type { return t }

askFooter = blockFooter (ws / nl)* eof

askBody = sL:statementList { return new ask.AskBody(sL) }

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
    ) { return new ask.Statement(s) }

// variables other than of function type
variableDefinition = 
      m:modifier ws+ i:identifier t:variableDefinition_type? ws+ '=' ws+ v:value { return new ask.VariableDefinition(m, i, t === null ? anyType : t, v)}
variableDefinition_type = ws+ ':' ws+ t:type { return t }  // TODO: 2x ws+ -> ws* ?

value = 
    e:(
      functionCall
    / identifier
    / valueLiteral)
    mCAs:methodCallApplied* { return new ask.Value(e, mCAs) }


functionDefinition = fH:functionHeader cB:codeBlock functionFooter { return new ask.FunctionDefinition(fH, cB) }

functionHeader = m:modifier ws+ i:identifier tD:functionHeader_typeDecl? ws* '=' ws* '(' aL:argList ')' rTD:functionHeader_returnTypeDecl? ws* '{' ws* nl { return new ask.FunctionHeader(m, i, tD, aL, rTD === null ? anyType : rTD) }
functionHeader_typeDecl = ws* ':' ws* t1:type { return t1 } // this is the optional variable type declaration
functionHeader_returnTypeDecl = ws* ':' ws* t2:type { return t2 } // this is the optional return type declaration

functionFooter = blockFooter

// a block of code 
codeBlock = statementList

argList = // TODO: check all the *List constructs for handling empty lists
    aL:nonEmptyArgList { return aL }
  / '' {                 return [] }

nonEmptyArgList =
    a:arg ',' aL:argList { return aL.unshift(a), aL }
  / a:arg { return [a] }

arg = ws* i:identifier ws* ':' ws* t:type ws* { return new ask.Arg(i, t) }

callArgList = v:valueList { return v }
valueList = 
    vL:nonEmptyValueList { return vL}
  / ws* { return [] }

nonEmptyValueList = 
    ws* v:value ws* ',' vL:nonEmptyValueList { vL.unshift(v); return vL }
  / ws* v:value ws* { return [v] }

if =        'if' ws* '(' v:value ')' ws* '{' nl+ cB:codeBlock nlws* '}' {       return new ask.If(v, cB) }
while  = 'while' ws* '(' v:value ')' ws* '{' nl+ cB:codeBlock nlws* '}' {       return new ask.While(v, cB) }
return = 
  'return' ws+ v:value {                                                        return new ask.Return(v) }
  / 'return' {                                                                  return new ask.Return(nullValue) }

functionCall = i:identifier ws* '(' cAL:callArgList ')' {                       return new ask.FunctionCall(i, cAL) }
methodCallApplied   = ws* ':' ws* i:identifier ws* cAL:methodCallAppliedArgList?  { return new ask.MethodCallApplied(i, cAL === null ? [] : cAL)}
methodCallAppliedArgList = '(' cAL:callArgList ')' { return cAL }

// === simple elements ===
type = i:identifier { return new ask.Type(i) }

valueLiteral = 
    v:(
      null
      / boolean
      / float // float needs to go before int
      / int
      / string
      / array
      / map
    ) { return new ask.ValueLiteral(v) }

string = '"' sC:stringContents  '"' { return sC }
stringContents = ch* { return new ask.String(text()) }

array = '[' vL:valueList ']' { return new ask.Array(vL) }
map = '{' mEL:mapEntryList '}' { return new ask.Map(mEL) }

mapEntryList = 
    mE:mapEntry ',' mEL:mapEntryList {  return mEL.unshift(mE), mEL }
  / mE:mapEntry {                       return [mE] }
mapEntry = i:identifier ':' v:value { return new ask.MapEntry(i, v) }


modifier = const / let
const = 'const' { return new ask.Const() }
let = 'let' { return new ask.Let() }

blockFooter = ws* '}'


emptyLine = ws* nl
nlws = nl / ws

// === literals ===
identifier = [_$a-zA-Z][-_$a-zA-Z0-9]* { return new ask.Identifier(text()) } // TODO: add Unicode here
null = 'null' { return new ask.Null() }
boolean = true / false
true = 'true' { return new ask.True() }
false = 'false' { return new ask.False() }
int = [-]?[0-9]+ { return new ask.Int(text()) }               // TODO: yes, multiple leading zeros possible, I might fix one day
float = [-]?[0-9]+ '.' [0-9]+ { return new ask.Float(text()) }  // TODO: yes, multiple leading zeros possible, I might fix one day

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
