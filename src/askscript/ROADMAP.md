# Assorted plans

## Remove tabs from the codebase - lets stick with identation of two spaces

## Allow values at the top level of program

```
'Hello world'
```

should compute just fine at the top level, same as

```
[5,6]
```

## Operators cannot have any hardcoded priority

```
2 + (3 * 4)
```

otherwise this is just confusing...

## Lambda shorthand

```ask
fun { 5 }
```

instead of

```ask
fun () { 5 }
```
