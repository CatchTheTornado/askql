{
  const path = require('path');
  const ask = require(path.join(__dirname, '../../../../src/askscript/parser/askscript.grammar.pegjs.classes.ts'));
}


ask = lineWithoutCode* aH:askHeader aB:askBody askFooter lineWithoutCode* eof {
  return new ask.Ask(aH, aB);
}

askForRepl = lineWithoutCode* ws* 'ask' aL:askHeader_argList? aRT:askHeader_retType? ws* '{' .*

askHeader = ws* 'ask' aL:askHeader_argList? aRT:askHeader_retType? ws* '{' ws* lineComment? nl {
  return new ask.AskHeader(aL === null ? [] : aL, aRT);
}
askHeader_argList = ws* '(' aL:argList ')' { return aL }
askHeader_retType = ws* ':' ws* t:type { return t }

askFooter = blockFooter ws*

askBody = sL:statementList { return new ask.AskBody(sL) }

statementList = lineWithoutCode* sL:statementList_NoEmptyLines lineWithoutCode* { return sL }
statementList_NoEmptyLines = 
      s:statement ws* lineComment? nl lineWithoutCode* sL:statementList { return sL.unshift(s), sL }
    / s:statement ws* lineComment? {                                      return [s] }
    / '' {                                                                return [] }

// statement is at least one full line
// statement does NOT include the trailing newline
statement = ws* s:statement_NoWs ws* { return s }
statement_NoWs = 
    s:(
      functionDefinition
      / variableDefinition
      / if
      / while
      / forOf
      / forIn
      / return
      / value
    ) { return new ask.Statement(s) }

// variables other than of function type
variableDefinition = 
      vD:variableDeclaration ws* '=' ws* v:value { return new ask.VariableDefinition(vD, v) }
variableDeclaration = 
      m:modifier ws+ i:identifier t:variableDefinition_type? { return new ask.VariableDeclaration(m, i, t === null ? ask.anyType : t) }
variableDefinition_type = ws* ':' ws* t:type { return t }

value = 
    e:(
      functionObject
    / functionCall
    / query
    / valueLiteral
    / identifier)
    mCAs:methodCallApplied* { return new ask.Value(e, mCAs) }

functionDefinition = fS:functionSignature ws* '=' ws* fO:functionObject {                             return new ask.FunctionDefinition(fS, fO) }

functionObject = fH:functionHeader cB:codeBlock functionFooter {                                      return new ask.FunctionObject(fH, cB) }

functionSignature = m:modifier ws+ i:identifier tD:functionHeader_typeDecl? {                         return new ask.FunctionSignature(m, i, tD) }
functionHeader = 'fun' ws* '(' aL:argList ')' rTD:functionHeader_returnTypeDecl? ws* '{' ws* lineComment? nl {  return new ask.FunctionHeader(aL, rTD === null ? ask.anyType : rTD) }
functionHeader_typeDecl = ws* ':' ws* t1:type { return t1 } // this is the optional variable type declaration
functionHeader_returnTypeDecl = ws* ':' ws* t2:type { return t2 } // this is the optional return type declaration

functionFooter = blockFooter


codeBlockWithBraces = '{' ws* lineComment? nl+ cB:codeBlock nlws* '}' { return cB; }

// a block of code 
codeBlock = statementList


query = queryHeader qFL:queryFieldList queryFooter { return new ask.Query(qFL) }

queryHeader = 'query {' ws* lineComment? nl
queryFieldList = 
    lineWithoutCode* qF:queryField ws* lineComment? nl lineWithoutCode* qFL:queryFieldList {  return qFL.unshift(qF), qFL }
  / lineWithoutCode* qF:queryField ws* lineComment? nl lineWithoutCode* {                     return [qF] }
  / lineWithoutCode* {                                                                        return [] }

queryField =
    qFN:queryFieldNode { return qFN }
  / qFL:queryFieldLeaf { return qFL }

queryFieldNode = ws* i:identifier ws* '{' ws* lineComment? nl lineWithoutCode* qFL:queryFieldList ws* '}' { return new ask.QueryFieldNode(i, qFL) }

queryFieldLeaf = 
    ws* i:identifier ws* '=' ws* v:value {     return new ask.QueryFieldLeaf(i, v) }
  / ws* i:identifier mCAs:methodCallApplied* { return new ask.QueryFieldLeaf(i, new ask.Value(i, mCAs)) }
  / ws* i:identifier {                         return new ask.QueryFieldLeaf(i, new ask.Value(i, [])) }

queryFooter = blockFooter


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

if =        'if' ws* '(' v:value ')' ws* cB:codeBlockWithBraces ws* eB:elseBlock? {       return new ask.If(v, cB, eB) }
while  = 'while' ws* '(' v:value ')' ws* cB:codeBlockWithBraces {                         return new ask.While(v, cB) }
forOf  = 'for'   ws* '(' vD:variableDeclaration ws+ 'of' ws+ v:value ws* ')' ws* cB:codeBlockWithBraces { return new ask.ForOf(vD, v, cB)}
forIn  = 'for'   ws* '(' vD:variableDeclaration ws+ 'in' ws+ v:value ws* ')' ws* cB:codeBlockWithBraces { return new ask.ForIn(vD, v, cB)}
elseBlock = 'else' ws* cB:codeBlockWithBraces { return new ask.Else(cB) }
return = 
    'return' ws+ v:value {                                                        return new ask.Return(v) }
  / 'return' {                                                                  return new ask.Return(ask.nullValue) }

functionCall = i:identifier ws* '(' cAL:callArgList ')' {                       return new ask.FunctionCall(i, cAL) }
methodCallApplied   = ws* ':' ws* i:identifier ws* cAL:methodCallAppliedArgList?  { return new ask.MethodCallApplied(i, cAL === null ? [] : cAL)}
methodCallAppliedArgList = '(' cAL:callArgList ')' { return cAL }

// === simple elements ===
type = 
    'array(' t:type ')' { return new ask.ArrayType(t) }
  / i:identifier {        return new ask.Type(i) }


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

string = "'" sC:stringContents  "'" { return sC }
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

lineWithoutCode = 
    lineWithComment
  / emptyLine

lineWithComment = lineComment

lineComment = ws* '//' (!nl .)* (&nl / eof)

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
  '\\' escape
  / [\x20-\x26\x28-\x5B\x5D-\xff] // all printable characters except ' (\x27) and \ (\x5C)

escape =
      "'"
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
eof = (!.)
